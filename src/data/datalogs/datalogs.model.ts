import { model } from "mongoose";
import { IDataLogDocument, IDataLogModel } from "./datalogs.types";
import DataLogSchema from "./datalogs.schema";
export const DataLogModel = model<IDataLogDocument>("datalog", DataLogSchema, "DataLogs") as IDataLogModel;