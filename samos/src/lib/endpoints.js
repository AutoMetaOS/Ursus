// import cfg from "./config";
import { match, AMOS } from "./standards";
import { twitter_tweet, google_news } from "../handlers/social";
import { search_suggestions, get_metadata } from "../handlers/quick";


const quickHandler = ( functor, params ) => {
    if ( match( functor, 'suggest' ) )
        return search_suggestions( params.toString() );

    if ( match( functor, 'metadata' ) )
        return get_metadata( params.get( 'url' ) );
};

const contentHandler = ( functor, params ) => {
    const statusCode = 307;

    if ( match( functor, 'css' ) )
        return Response.redirect(
            `${ AMOS.root }/OUI/css/${ searchParams.get( 'name' ) }`,
            statusCode
        );
};

const socialHandler = ( functor, params ) => {
    if ( match( functor, 'twitter' ) )
        return twitter_tweet( params.get( 'id' ) );

    if ( match( functor, 'google' ) )
        return google_news( params );
};


export const handlerHandler = ( series ) => {
    if ( series === 'quick' ) return quickHandler;
    if ( series === 'cms' ) return contentHandler;
    if ( series === 'social' ) return socialHandler;
};

// export const handler = ( series, functor, params ) => {
//     const { type, func, filter } = cfg[ series ][ functor ];
//     if ( type === 'func' ) return func( filter( params ) );
// };