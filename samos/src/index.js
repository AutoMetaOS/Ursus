import { headers } from "./lib/standards.js";
import { handler } from "./lib/endpoints";


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

  return new Response( getResponse( data ), { headers: headers.std } );
};

addEventListener( "fetch", event => event.respondWith( handleRequest( event.request ) ) );