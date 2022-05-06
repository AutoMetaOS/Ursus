export const twitter_tweet = async ( id ) =>
    fetch( 'https://kizie.co/api/requests/getTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        redirect: 'follow',
        referrer: ' https://kizie.co/tools/twitter-image',
        body: JSON.stringify( { id } )
    } )
        .then( r => r.json() ).then( d => {
            return {
                id: d.id_str,
                text: d.full_text,
                by: {
                    id: d.user.id_str,
                    name: d.user.name,
                    screen: d.user.screen_name,
                    dp: d.user.profile_image_url_https
                }
            };
        } );


const goog_get = async ( endpoint ) => {
    const response = await fetch(
        `https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=-330&fi=0&fs=0&ri=300&rs=20&sort=0&geo=${ endpoint }`
    ).then( d => d.text() );

    return JSON.parse( response.slice( 4 ) ).storySummaries.trendingStories;
};
export const google_news = async(location) => {
    const promises = location.split( ',' );
    const response = await Promise.all( [ 'b', 'm', 't' ].map( e => goog_get( e ) ) );
}


async function handleRequest ( request ) {

    if ( path.startsWith( '/gt' ) ) {
        const end = path.split( '?' )[ 1 ];
        const promises = [ 'b', 'm', 't' ].map( e => googet( `${ end }&cat=${ e }` ) );
        const response = await Promise.all( promises );

        return new Response( JSON.stringify( response.flat() ), defaultHeaders );
    }

    return new Response( "Invalid Endpoint:" + path, defaultHeaders );
};