import * as express from "express";
import { IDataLogDocument } from "../data/datalogs/datalogs.types";
import { convertDateToTicks, getDateTimeInTicks } from "../helpers/date-time-helper";
import { connect } from "../data/database"

export const register = ( app: express.Application ): void => {

    const datalogModel = connect();

    app.get('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;

        console.log(`Retrieving datalogs for sensor ID ${sensorId}.`);

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

            return res.json(datalogs);
        } catch (err) {
            console.error(err);
            res.json( { error: err.message || err } );
        }
    });

    app.post('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        const {Temperature, RelativeHumidity, Timestamp} = req.body;
        
        console.log(`Creating datalog: ${JSON.stringify(req.body)}`);

        try {
            const datalog = await datalogModel.create({
                SensorId: sensorId,
                Temperature: Temperature,
                RelativeHumidity: RelativeHumidity,
                Timestamp: Timestamp || getDateTimeInTicks()
            });
            return res.json(datalog);
        } catch (err) {
            console.error(err);
            res.json( { error: err.message || err } );
        }
    });

    app.get('/v1', async (req, res) => {
        try {
            res.send("Hello World!");
            return res.end();
        } catch ( err ) {
            console.error(err);
            res.json( { error: err.message || err } );
        }
    });
};