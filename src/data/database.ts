import mongoose from "mongoose";
import { DataLogModel } from "./datalogs/datalogs.model";
import { IDataLogModel } from "./datalogs/datalogs.types";

let database: mongoose.Connection;

export const connect = (): IDataLogModel => {

    if (database) {
        return DataLogModel;
    }
    
    if(!process.env.DATABASE_URI){
        throw new Error("Database URI not specified.")
    }

    if(!process.env.DATABASE_NAME){
        throw new Error("Database name not specified.")
    }

    mongoose.connect(process.env.DATABASE_URI,{
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        dbName: process.env.DATABASE_NAME
    });

    database = mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database.");
    });

    database.on("error", () => {
        console.log("Error connecting to database.");
    });

    return DataLogModel;
};

export const disconnect = (): void => {
    if (!database) {
        console.log("Database already disconnected.");
        return;
    }
    mongoose.disconnect();
    console.log("Database disconnected.");

};