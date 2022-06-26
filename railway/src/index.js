import { Respond, match, getKeys, transformer, getPart, arrayMerge } from "./basics";

async function handleRequest ( request ) {
  const { pathname, searchParams } = new URL( request.url ),
    ns = POSTS;

  const //
    [ end, job ] = pathname.split( "/frontier" )[ 1 ].split( '/' ).slice( 1 ),
    ID = searchParams.get( "id" );

  if ( match( end, 'list' ) ) return Respond( await getKeys( ns ) );
  if ( match( end, 'all' ) ) return Respond( await getKeys( ns, true ) );
  if ( match( end, 'get' ) ) return Respond( await ns.get( ID ) );
  // if ( match( end, 'delete' ) ) return Respond( await ns.delete( ID ) );

  if ( match( end, 'stacks' ) ) {
    const keys = await getKeys( ns );

    const splits =
      keys
        .map( e => e.split( '-' ) )
        .map( e => [
          e[ 1 ].slice( 0, 3 ), // MatchBy
          e[ 1 ].slice( 3 ), // CombineTo
          e[ 0 ] // ID
        ] );
    // Result
    // [ TopicNo: String, PartNo: Array, DateID: String ];

    const combined = arrayMerge( splits, 0, 1 ).map( e => e[ 1 ].map( t => `${ e[ 2 ] }-${ e[ 0 ] }${ t }` ) );
    // Gives array of keys which are all related

    let result = [];
    for ( let i = 0;i < combined.length;i++ ) {
      const stack = combined[ i ];
      const stack_data = await Promise.all( stack.map( e => ns.get( e ) ) );
      result.push( {
        type: stack_data.length > 1 ? 'stack' : 'post',
        ...transformer( stack_data, stack )
      } );
    }

    return Respond( result );
  };

  // if ( match( end, 'put' ) ) {
  //   const value = await request.json();
  //   await ns.put( ID, value );

  //   return Respond( value );
  // };

  if ( match( end, 'related' ) ) {
    const keys = await getKeys( ns );
    const ev = keys.filter( e => getPart( e ) === getPart( ID ) );

    return Respond( ev );
  };

  return Respond( "No Such Endpoint" );
};

// https://api.nukes.in/frontier/get?id=kwmfqfk0-04301

addEventListener( "fetch", event => event.respondWith( handleRequest( event.request ) ) );