import dotenv from "dotenv";
import express from "express";
import path from "path";

// initialize configuration
dotenv.config();

// port is now available to the Node.js runtime 
// as if it were an environment variable
const port = process.env.SERVER_PORT;

const app = express();

// Configure Express to use EJS
app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    // render the index template
    res.render( "index" );
});

app.get('guitars', (req, res) => {
    console.log(`GUITARS`);
    res.send('TODO');
    res.end();
    //TODO: Fetch datalogs for sensor ID from MongoDB
    //TODO: Return datalogs
});

app.get('v1/sensors/:sensorId/datalogs', (req, res) => {
    const sensorId: string = req.params.sensorId;
    console.log(`Retrieving datalogs for sensor ID ${sensorId}`);
    res.send('TODO');
    res.end();
    //TODO: Fetch datalogs for sensor ID from MongoDB
    //TODO: Return datalogs
});

// start the express server
app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `Server started at http://localhost:${ port }` );
} );