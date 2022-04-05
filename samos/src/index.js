import { headers, match } from "./lib/standards.js";

async function handleRequest ( request ) {
  const path = request.url.split( '/quick/' )[ 1 ];

  let //
    response,
    results;

  if ( match( path, 'suggest' ) ) {
    const searchTerm = path.split( '?' )[ 1 ];
    response = await getBrave( searchTerm );
    return new Response( response, headers.std );
  }
  if ( match( path, 'metadata' ) ) {
    const searchTerm = path.split( '?url=' )[ 1 ];
    response = await getMetadata( searchTerm );
    return new Response( response, headers.std );
  }

  return new Response( "Invalid Endpoint:" + path, { headers: headers.std } );
};


async function getMetadata ( searchTerm ) {
  const data = await fetch( `https://api.urlmeta.org/?url=${ searchTerm }`, {
    headers: {
      Authorization: "Basic "
    }
  } ).then( r => r.json() );

  return JSON.stringify( data );
};

async function getBrave ( searchTerm ) {
  const Google_BASE = "https://www.google.com/complete/search?cp=6&client=gws-wiz&xssi=t&";
  const response = await fetch( Google_BASE + searchTerm );
  const json = ( await response.text() )
    .split( "'" )[ 1 ]
    .replaceAll( '<b>', '' )
    .replaceAll( '</b>', '' );
  const reply = JSON.parse( json )[ 0 ].slice( 0, 2 );
  return JSON.stringify( reply );
};

addEventListener( "fetch", event => event.respondWith( handleRequest( event.request ) ) );