import { Document, Model } from "mongoose";

export interface IDataLog {
    SensorId: string;
    Timestamp: number[];
    Temperature: number;
    RelativeHumidity: number;
}

export interface IDataLogDocument extends IDataLog, Document {}

export type IDataLogModel = Model<IDataLogDocument>;