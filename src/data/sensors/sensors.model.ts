import { model } from "mongoose";
import { ISensorDocument, ISensorModel } from "./sensors.types";
import SensorSchema from "./sensors.schema";
export const SensorModel = model<ISensorDocument>("sensor", SensorSchema, "Sensors") as ISensorModel;