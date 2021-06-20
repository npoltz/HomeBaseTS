import dotenv from "dotenv";
import express from "express";
import * as routes from "./routes";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();
routes.register(app);

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `Server started at http://localhost:${ port }` );
} );