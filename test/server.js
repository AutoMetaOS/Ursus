import fetch from "node-fetch";
import express from "express";

const app = express();

const jfetcher = ( end ) => fetch( `https://api.nukes.in/${ end }` ).then( r => r.json() );
const tfetcher = ( end ) => fetch( `https://api.nukes.in/${ end }` ).then( r => r.text() );

app.use( express.static( '.' ) )
app.get( '/bypass', function ( req, res ) {
    console.warn( req.url );
    const request = req.url.replace( '/bypass?', '' );
    const [ protocol, endpoint ] = request.split( '::' );

    if ( protocol === 'json' ) jfetcher( endpoint ).then( d => res.send( d ) );
    else tfetcher( endpoint ).then( d => res.send( d ) );
} )

app.listen( 3000, () => console.log( 'listening on 3000' ) );