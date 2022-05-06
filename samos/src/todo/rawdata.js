const GT_URL = "https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=-330&fi=0&fs=0&ri=300&rs=20&sort=0&geo=";

const googet = async ( endPt ) => {
    const MAIN_URL = GT_URL + endPt;
    const response = await fetch( MAIN_URL, defaultHeaders ).then( d => d.text() );

    return JSON.parse( response.slice( 4 ) ).storySummaries.trendingStories;
}

async function handleRequest ( request ) {
    const path = request.url.split( 'api.nukes.in/data' )[ 1 ];
    let response, results;

    if ( path.startsWith( '/gt' ) ) {
        const end = path.split( '?' )[ 1 ];
        const promises = [ 'b', 'm', 't' ].map( e => googet( `${ end }&cat=${ e }` ) );
        const response = await Promise.all( promises );

        return new Response( JSON.stringify( response.flat() ), defaultHeaders );
    }

    return new Response( "Invalid Endpoint:" + path, defaultHeaders );
};