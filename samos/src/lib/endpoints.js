import { match } from "./standards";

import { search_suggestions, get_metadata } from "./handlers/quick";

const quickHandler = ( functor, params ) => {
    if ( match( functor, 'suggest' ) )
        return search_suggestions( params.toString() );

    if ( match( functor, 'metadata' ) )
        return get_metadata( params.get( 'url' ) );
}


export const handlerHandler = ( series ) => {
    if ( series === 'quick' ) return quickHandler;
}