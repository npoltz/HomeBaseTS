import * as express from "express";
import { IDataLogDocument } from "../data/datalogs/datalogs.types";
import { connect, disconnect } from "../data/database"

export const register = ( app: express.Application ): void => {

    app.get('/v1/sensors/:sensorId/datalogs', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        
        let sinceTimeTicks: number | undefined;
        if(req.query.sinceDateTime){
            const sinceDateTime = new Date(req.query.sinceDateTime.toString());
            sinceTimeTicks = ((sinceDateTime.getTime() * 10000) + 621355968000000000)
        }

        console.log(`Retrieving datalogs for sensor ID ${sensorId}`);
        const datalogModel = connect();

        try {
            let datalogs: IDataLogDocument[];

            if(sinceTimeTicks){
                datalogs = await datalogModel.find({$and: [{SensorId: {$eq: sensorId}}, {Timestamp: {$gte: sinceTimeTicks}}] });
            }
            else{
                datalogs = await datalogModel.find({SensorId: {$eq: sensorId}});
            }

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
        const db = connect();

        try {
            await db.create(req.body);
            return res.end();
        } catch ( err ) {
            console.error(err);
            res.json( { error: err.message || err } );
        }

        if(db){
            disconnect();
        }
    });

    app.get('/v1/test', async (req, res) => {
        const db = connect();

        try {
            res.send("woo!");
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