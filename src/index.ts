import dotenv from "dotenv";
import express from "express";
import * as routes from "./routes";

dotenv.config();
const port = process.env.SERVER_PORT;

const app = express();
routes.register(app);

app.listen( port, () => {
    console.log(`Server started at http://localhost:${port}`);
} );