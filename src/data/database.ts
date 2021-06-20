import mongoose from "mongoose";
import { DataLogModel } from "./datalogs/datalogs.model";
import { IDataLogModel } from "./datalogs/datalogs.types";

let database: mongoose.Connection;

export const connect = (): IDataLogModel => {
    let uri: string;

    if(process.env.DATABASE_URI){
        uri = process.env.DATABASE_URI;
    }
    else{
        throw new Error("Database URI not specified.")
    }

    if (database) {
        return DataLogModel;
    }

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    database = mongoose.connection;

    database.once("open", async () => {
        console.log("Connected to database");
    });

    database.on("error", () => {
        console.log("Error connecting to database");
    });

    return DataLogModel;
};

export const disconnect = (): void => {
    if (!database) {
        console.log("Database already disconnected");
        return;
    }
    mongoose.disconnect();
    console.log("Database disconnected");

};