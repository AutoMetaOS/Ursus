const headers = {
  std: {
    "content-type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Origin': "*"
  },
  cors: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400",
  }
};

const is = ( actual, expect ) => actual.startsWith( expect );

async function handleRequest ( request ) {
  const { pathname, searchParams } = new URL( request.url );

  let //
    content = "",
    namespace = POSTS;

  const //
    endpoint = pathname.split( "/frontier/" )[ 1 ],
    ID = searchParams.get( "id" );

  if ( is( endpoint, 'list' ) ) {
    const all = await namespace.list();
    content = JSON.stringify( all.keys.map( e => e.name ) );
  };

  if ( is( endpoint, 'get' ) )
    content = await namespace.get( ID );

  if ( is( endpoint, 'delete' ) )
    content = await namespace.delete( ID );

  if ( is( endpoint, 'put' ) ) {
    const value = JSON.stringify( await request.json() );
    const task = await namespace.put( ID, value );
    content = value;
  };

  if ( is( endpoint, 'related' ) ) {
    const count = id => id.split( '-' )[ 1 ].slice( 0, 3 );

    const id = count( ID );

    const all = await namespace.list();
    const ev = all.keys
      .filter( e => count( e.name ) === id )
      .map( e => e.name );

    content = JSON.stringify( ev );
  };

  if ( is( endpoint, 'all' ) ) {
    const all = await namespace.list();
    const ev = all.keys
      .map( e => namespace.get( e.name ) );

    const t = await Promise.all( ev );

    const f = t.map( ( e, i ) => { return { ...e, id: all.keys[ i ].name } } );

    content = JSON.stringify( f );
  };

  return new Response( content, { headers: headers.std } );
};

function handleOptions ( request ) {
  let headers = request.headers;

  if (
    headers.get( "Origin" ) !== null &&
    headers.get( "Access-Control-Request-Method" ) !== null &&
    headers.get( "Access-Control-Request-Headers" ) !== null
  ) {
    let respHeaders = {
      ...headers.cors,
      "Access-Control-Allow-Headers": request.headers.get( "Access-Control-Request-Headers" ),
    }
    return new Response( null, { headers: respHeaders } )
  }
  else return new Response( null, { headers: { Allow: "GET, HEAD, POST, OPTIONS" } } );
};

addEventListener( "fetch", event => {
  const request = event.request;

  if ( request.method === "OPTIONS" )
    event.respondWith( handleOptions( request ) );
  else
    event.respondWith( handleRequest( request ) );
} );