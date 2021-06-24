import dotenv from "dotenv";
import express from "express";
import * as routes from "./routes";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const port = process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
routes.register(app);

app.listen( port, () => {
    console.log(`Server started at http://localhost:${port}`);
} );