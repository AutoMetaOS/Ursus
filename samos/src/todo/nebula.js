const nebulaFilter = ( r, tok ) => {
    const filtered = r.map( e => {
        const prefix = "content.watchnebula.com/video/";
        const suffix = '/iframe/' + tok;
        return {
            title: e.title,
            date: e.published_at,
            embedURL: prefix + e.slug + suffix,
            uri: e.slug,
            token: tok,
            channel: e.channel_title,
            image: e.assets.thumbnail[ "480" ].original
        };
    } )
        .sort( ( a, b ) => new Date( b.date ) - new Date( a.date ) );
    return filtered;
};

async function getNeb () {
    const NEBULA_TOKEN = "19c9f68df91347e674be4ddab1bd7cd88c0377f3";
    let headers = { Authorization: "Token " + NEBULA_TOKEN };
    const auth = await fetch( "https://api.watchnebula.com/api/v1/auth/user/", { headers } );
    const token = ( await auth.json() ).zype_auth_info.access_token;

    const connect = await fetch( "https://api.watchnebula.com/api/v1/authorization/", { headers, method: "POST" } );
    const verification = await connect.json();

    headers = { Authorization: "Bearer " + verification.token };
    const ENDPOINT = "https://content.watchnebula.com/library/video/";

    let calls = [ fetch( ENDPOINT, { headers } ), fetch( ENDPOINT + "?page=2", { headers } ) ];

    const library = await Promise.all( calls );
    const json = await Promise.all( library.map( r => r.json() ) );

    const filtered = [ ...json.map( r => nebulaFilter( r.results, token ) ) ];

    return JSON.stringify( filtered.flat() );
};

async function gatherResponse ( response ) {
    const { headers } = response;
    const contentType = headers.get( "content-type" ) || "";
    if ( contentType.includes( "application/json" ) )
        return await response.json();
    else return await response.text();
};

async function handleRequest ( request ) {
    const path = request.url.split( 'api.nukes.in/nebula' )[ 1 ];
    let response, results;

    if ( path === '/subs' ) {
        response = await getNeb();
        return new Response( response, defaultHeaders );
    }

    return new Response( "Invalid Endpoint:" + path, defaultHeaders );
};