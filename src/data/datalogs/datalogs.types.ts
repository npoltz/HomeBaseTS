import { Document, Model } from "mongoose";

export interface IDataLog {
    Id: string;
    SensorId: string;
    Timestamp: Date;
    Temperature: number;
    RelativeHumidity: number;
}

export interface IDataLogDocument extends IDataLog, Document {}

export type IDataLogModel = Model<IDataLogDocument>;