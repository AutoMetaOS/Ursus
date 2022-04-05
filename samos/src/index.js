import { headers } from "./lib/standards.js";
import { handlerHandler } from "./lib/endpoints";


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

  const handler = handlerHandler( series );
  const data = await handler( functor, searchParams );

  return new Response( getResponse( data ), { headers: headers.std } );
};

addEventListener( "fetch", event => event.respondWith( handleRequest( event.request ) ) );