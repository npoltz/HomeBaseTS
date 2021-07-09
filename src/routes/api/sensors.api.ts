import * as express from 'express';
import { SensorModel } from '../../data/sensors/sensors.model';

export const register = ( app: express.Application ): void => {

    app.get('/v1/sensors', async (req, res) => {
        console.log('Retrieving all sensors.');
        try {
            const sensors = await SensorModel.find();
            return res.json(sensors);
        } catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
    });

    app.get('/v1/sensors/:sensorId', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        console.log(`Retrieving sensor for sensor ID ${sensorId}.`);

        try {
            const sensor = await SensorModel.findOne({SensorId: {$eq: sensorId}});
            if (sensor == null) {
                return res.status(404).end();
            }
            return res.json(sensor);
        } catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
    });

    app.post('/v1/sensors', async (req, res) => {
        const {sensorId, name} = req.body;
        
        console.log(`Updating sensor: ${JSON.stringify(req.body)}`);

        try {
            const doc = await SensorModel.findOne({SensorId: sensorId});
            doc?.overwrite({ SensorId: sensorId, Name: name });
            await doc?.save();
            return res.json(doc);
        } catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
    });
};