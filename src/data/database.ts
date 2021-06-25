import mongoose from "mongoose";

let database: mongoose.Connection;

export const connect = (): void => {

    if (database && (database.readyState === 1 || database.readyState === 2)) {
        return;
    }
    
    if(!process.env.DATABASE_URI){
        throw new Error("Database URI not specified.")
    }

    if(!process.env.DATABASE_NAME){
        throw new Error("Database name not specified.")
    }

    console.log(`Connecting to ${process.env.DATABASE_URI}`);

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
};

export const disconnect = (): void => {
    if (!database || database.readyState != 1) {
        console.log("Database already disconnected.");
        return;
    }
    mongoose.disconnect();
    console.log("Database disconnected.");

};