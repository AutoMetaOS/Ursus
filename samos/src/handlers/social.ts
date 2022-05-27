export const twitter_tweet = async ( id: string ): Promise<object> => {
    const response = await fetch( 'https://kizie.co/api/requests/getTweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { "id": BigInt( id ).toString() } )
    } )
        .then( r => r.json() );

    const { id_str, full_text, user } = response;
    const { id_str: id_str_user, name, screen_name, profile_image_url_https } = user;

    const processed = {
        id: id_str,
        text: full_text,
        by: {
            id: id_str_user,
            name: name,
            screen: screen_name,
            dp: profile_image_url_https
        }
    };

    return processed;
};

const goog_get = async ( endpoint:string ): Promise<object> => {
    const response = await fetch(
        `https://trends.google.com/trends/api/realtimetrends?hl=en-GB&tz=-330&fi=0&fs=0&ri=300&rs=20&sort=0&geo=${ endpoint }`
    ).then( d => d.text() );

    return JSON.parse( response.slice( 4 ) ).storySummaries.trendingStories;
};

export const google_news = async ( location:string ): Promise<void> => {
    const promises = location.split( ',' );
    const response = await Promise.all( [ 'b', 'm', 't' ].map( e => goog_get( e ) ) );
}

// async function handleRequest ( request ) {
//     if ( path.startsWith( '/gt' ) ) {
//         const end = path.split( '?' )[ 1 ];
//         const promises = [ 'b', 'm', 't' ].map( e => googet( `${ end }&cat=${ e }` ) );
//         const response = await Promise.all( promises );

//         return new Response( JSON.stringify( response.flat() ), defaultHeaders );
//     }

//     return new Response( "Invalid Endpoint:" + path, defaultHeaders );
// };