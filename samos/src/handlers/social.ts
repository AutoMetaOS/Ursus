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