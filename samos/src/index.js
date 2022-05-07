import { headers } from "./lib/standards.js";
import cfg from "./lib/config";

const handler = ( series, functor, params ) => {
  const { type, func, filter, url } = cfg[ series ][ functor ];

  if ( type === 'func' )
    return func( filter( params ) );

  if ( type === 'redirect' )
    return { type: 'special', url: url( params ) };
};

const getResponse = data => {
  const type = typeof data;
  if ( type === "string" ) return data;
  if ( type === "object" ) return JSON.stringify( data );
};

async function handleRequest ( request ) {
  const { pathname, searchParams } = new URL( request.url );
  const path = pathname.split( "/" );

  const series = path[ 1 ];
  const functor = path.slice( 2 ).join( "/" );

  const data = await handler( series, functor, searchParams );

  if ( data.type === 'special' )
    return Response.redirect( data.url, statusCode = 307 );
  else
    return new Response( getResponse( data ), { headers: headers.std } );
};

addEventListener( "fetch", event => event.respondWith( handleRequest( event.request ) ) );