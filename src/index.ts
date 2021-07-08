import dotenv from "dotenv";
import express from "express";
import path from "path";
import * as routes from "./routes";

dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const port = process.env.SERVER_PORT;

const app = express();
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );
app.use(express.json());
app.use(express.static('dist/public/'));
routes.register(app);

app.listen( port, () => {
    console.log(`Server started at http://localhost:${port}`);
} );