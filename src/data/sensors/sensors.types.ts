import { Document, Model } from "mongoose";

export interface ISensor {
    SensorId: string;
    Name: string;
}

export interface ISensorDocument extends ISensor, Document {}

export type ISensorModel = Model<ISensorDocument>;