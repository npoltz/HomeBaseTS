import * as express from "express";
import * as api from "./api";

export const register = (app: express.Application): void => {
    
    // // Configure Express to use EJS
    // app.set( "views", path.join( __dirname, "views" ) );
    // app.set( "view engine", "ejs" );

    // // define a route handler for the default home page
    // app.get( "/", ( req, res ) => {
    //     // render the index template
    //     res.render( "index" );
    // });

    api.register(app);
}