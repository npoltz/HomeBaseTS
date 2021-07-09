import * as express from 'express';
import * as sensorsapi from './api/sensors.api';
import * as datalogsapi from './api/datalogs.api';
import { DataLogModel } from '../data/datalogs/datalogs.model';
import { IDataLogDocument } from '../data/datalogs/datalogs.types';
import { convertTicksToSinceString } from '../helpers/date-time-helper';
import { ISensorDocument } from '../data/sensors/sensors.types';
import { SensorModel } from '../data/sensors/sensors.model';

export const register = (app: express.Application): void => {
    app.get( '/', (req, res) => {
        res.render('index');
    });

    app.get('/v1', async (req, res) => {
        try {
            return res.send("Hello World!");
        } catch ( err ) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
    });

    app.get( '/sensor-manager', (req, res) => {
        res.render('sensor-manager', { title: 'Sensor Manager' });
    });

    app.get( '/sensor-data', async (req, res) => {
        let sensor: ISensorDocument | undefined;
        let sensors: ISensorDocument[];
        let datalog: IDataLogDocument | null;

        try{
            sensors = await SensorModel.find().sort({Name: -1});
            if (sensors?.length > 0){
                sensor = sensors[0];
            }
            else {
                return res.render('sensor-data', { title: 'Sensor Data', sensors: [{SensorId: 'Undefined', Name: 'Undefined'}], sensor: {SensorId: 'Undefined', Name: 'Undefined'}, lastUpdated: 'never', latestTemp: '-°C', latestHumidity: '-%' });
            }
            datalog = await DataLogModel.findOne({SensorId: {$eq: sensor.SensorId}}).sort({Timestamp: -1});
        }
        catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }

        const lastUpdated: string = convertTicksToSinceString(datalog?.Timestamp, Date.now());
        res.render('sensor-data', { title: 'Sensor Data', sensors, sensor, lastUpdated, latestTemp: (datalog?.Temperature || '-') + '°C', latestHumidity: (datalog?.RelativeHumidity || '-') + '%' });
    });

    app.get( '/sensor-data/:sensorId', async (req, res) => {
        const sensorId: string = req.params.sensorId;
        let sensor: ISensorDocument | undefined;
        let sensors: ISensorDocument[];
        let datalog: IDataLogDocument | null;

        try{
            sensors = await SensorModel.find().sort({Name: -1});
            if (sensors?.length > 0){
                sensors.forEach(sensorElement => {
                    if (sensorElement.SensorId == sensorId) {
                        sensor = sensorElement;
                    }
                });
            }
            else {
                return res.render('sensor-data', { title: 'Sensor Data', sensors: [{SensorId: 'Undefined', Name: 'Undefined'}], sensor: {SensorId: 'Undefined', Name: 'Undefined'}, lastUpdated: 'never', latestTemp: '-°C', latestHumidity: '-%' });
            }
            datalog = await DataLogModel.findOne({SensorId: {$eq: sensorId}}).sort({Timestamp: -1});
        }
        catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }

        const lastUpdated: string = convertTicksToSinceString(datalog?.Timestamp, Date.now());
        res.render('sensor-data', { title: 'Sensor Data', sensors, sensor, lastUpdated, latestTemp: (datalog?.Temperature || '-') + '°C', latestHumidity: (datalog?.RelativeHumidity || '-') + '%' });
    });

    sensorsapi.register(app);
    datalogsapi.register(app);
}