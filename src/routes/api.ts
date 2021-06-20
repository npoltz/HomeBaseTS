import * as express from "express";
import { connect, disconnect } from "../data/database"

export const register = ( app: express.Application ): void => {
    app.get('/v1/sensors/:sensorId/datalogs?:sinceDateTime', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        const sinceDateTime: Date = new Date(req.params.sinceDateTime);
        console.log(`Retrieving datalogs for sensor ID ${sensorId}`);
        const datalogModel = connect();

        try {
            const datalogs = datalogModel.find({ $and: [ { SensorId: {$eq: sensorId} }, { Timestamp: {$gte: sinceDateTime || new Date("1900-01-01")} } ] });
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
            db.create(req.body);
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