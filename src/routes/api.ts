import * as express from "express";
import { DataLogModel } from "../data/datalogs/datalogs.model";
import { IDataLogDocument } from "../data/datalogs/datalogs.types";
import { connect, disconnect } from "../data/database"
import { convertDateToTicks, getCurrentTimeInTicks } from "../helpers/date-time-helper";

export const register = ( app: express.Application ): void => {

    app.get('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;

        console.log(`Retrieving datalogs for sensor ID ${sensorId}.`);

        try {
            connect();
            let datalogs: IDataLogDocument[];

            if(req.query.sinceDateTime){
                const sinceDateTimeTicks = convertDateToTicks(req.query.sinceDateTime.toString());
                datalogs = await DataLogModel.find({$and:   [
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

                datalogs = await DataLogModel.find({SensorId: {$eq: sensorId}}).sort({Timestamp: -1}).limit(limit);
            }

            console.log(`Found ${datalogs.length} datalog(s).`);

            return res.json(datalogs);
        } catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
        finally{
            disconnect();
        }
    });

    app.post('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        const {Temperature, RelativeHumidity, Timestamp} = req.body;
        
        console.log(`Creating datalog: ${JSON.stringify(req.body)}`);

        try {
            connect();
            const datalog = await DataLogModel.create({
                SensorId: sensorId,
                Temperature: Temperature,
                RelativeHumidity: RelativeHumidity,
                Timestamp: Timestamp || getCurrentTimeInTicks()
            });
            return res.json(datalog);
        } catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
        finally{
            disconnect();
        }
    });

    app.get('/v1', async (req, res) => {
        try {
            return res.send("Hello World!");
        } catch ( err ) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
    });
};