async function handleRequest ( request ) {
    const { pathname, searchParams } = new URL( request.url );
    let content = "";

    let namespace;
    switch ( searchParams.get( 'db' ) ) {
        case 'works':
            namespace = WORKS;
            break;
        case 'pluto':
            namespace = PLUTO;
            break;
        case 'books':
            namespace = BOOKS;
            break;
        default:
            namespace = STACK;
    };

    if ( pathname.startsWith( '/amos/list' ) ) {
        const all = await namespace.list();
        content = JSON.stringify( all.keys );
    };
    if ( pathname.startsWith( '/amos/get' ) ) {
        const id = searchParams.get( 'id' );
        content = await namespace.get( id );
    };
    if ( pathname.startsWith( '/amos/delete' ) ) {
        const id = searchParams.get( 'id' );
        content = await namespace.delete( id );
    };
    if ( pathname.startsWith( '/amos/put' ) ) {
        const id = searchParams.get( 'id' );
        const value = atob( searchParams.get( 'value' ) );
        let task = await namespace.put( id, value );
        content = value;
    };
    if ( pathname.startsWith( '/amos/type' ) ) {
        const q = searchParams.get( 'q' ) || "Video";
        const all = await namespace.list();
        const ev = all.keys
            .map( e => namespace.get( e.name ) );

        const t = await Promise.all( ev );

        const f = t
            .filter( e => e.includes( `"${ q }"` ) )
            .map( ( e, i ) => `"id":"${ all.keys[ i ].name }",` + e );

        content = JSON.stringify( f );
    };
    if ( pathname.startsWith( '/amos/all' ) ) {
        const all = await namespace.list();
        const ev = all.keys
            .map( e => namespace.get( e.name ) );

        const t = await Promise.all( ev );

        const f = t.map( ( e, i ) => `"id":"${ all.keys[ i ].name }",` + e );

        content = JSON.stringify( f );
    };

    return new Response( content, global_headers.normal );
};