import * as express from "express";
import { convertDateToTicks } from "../helpers/date-time-helper";
import { IDataLogDocument } from "../data/datalogs/datalogs.types";
import { connect, disconnect } from "../data/database"

export const register = ( app: express.Application ): void => {

    app.get('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;

        console.log(`Retrieving datalogs for sensor ID ${sensorId}.`);
        const datalogModel = connect();

        try {
            let datalogs: IDataLogDocument[];

            if(req.query.sinceDateTime){
                const sinceDateTimeTicks = convertDateToTicks(req.query.sinceDateTime.toString());
                datalogs = await datalogModel.find({$and:   [
                                                                {SensorId: {$eq: sensorId}},
                                                                {Timestamp: {$gte: sinceDateTimeTicks}}
                                                            ]
                                                    });
            }
            else{
                let limit: number;
                if(req.query.limit){
                    limit = parseInt(req.query.limit.toString())
                }
                else{
                    limit = 500;
                }

                datalogs = await datalogModel.find({SensorId: {$eq: sensorId}}).sort({Timestamp: -1}).limit(limit);
            }

            console.log(`Found ${datalogs.length} datalog(s).`);

            return res.json( datalogs );
        } catch ( err ) {
            console.error(err);
            res.json( { error: err.message || err } );
        }

        if(datalogModel){
            disconnect();
        }
    });

    app.post('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const datalogModel = connect();

        console.log(`Creating datalog: ${JSON.stringify(req.body)}`);

        const { SensorId , Temperature, RelativeHumidity} = req.body;

        try {
            await datalogModel.create(req.body);
            return res.end();
        } catch ( err ) {
            console.error(err);
            res.json( { error: err.message || err } );
        }

        if(datalogModel){
            disconnect();
        }
    });

    app.get('/v1', async (req, res) => {
        const db = connect();

        try {
            res.send("Hello World!");
            return res.end();
        } catch ( err ) {
            console.error(err);
            res.json( { error: err.message || err } );
        }

        if(db){
            disconnect();
        }
    });
};