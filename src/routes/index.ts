import * as express from 'express';
import * as api from './api';
import { DataLogModel } from '../data/datalogs/datalogs.model';
import { IDataLogDocument } from '../data/datalogs/datalogs.types';
import { connect, disconnect } from '../data/database'
import { convertTicksToSinceString } from '../helpers/date-time-helper';

export const register = (app: express.Application): void => {
    app.get( '/', (req, res) => {
        res.render('index');
    });

    app.get( '/sensor-data', async (req, res) => {
        let datalog: IDataLogDocument | null;

        try{
            connect();
            datalog = await DataLogModel.findOne({SensorId: {$eq: 's01'}}).sort({Timestamp: -1});
        }
        catch (err) {
            console.error(err);
            return res.status(500).json( { error: err.message || err } );
        }
        finally{
            disconnect();
        }

        let lastUpdated: string;
        if(datalog) {
            lastUpdated = convertTicksToSinceString(datalog.Timestamp, Date.now());
        }
        else {
            lastUpdated = 'never';
        }

        res.render('sensor-data', { title: 'Sensor Data', lastUpdated, latestTemp: (datalog?.Temperature || '-') + '°C', latestHumidity: (datalog?.RelativeHumidity || '-') + '%' });
    });

    api.register(app);
}