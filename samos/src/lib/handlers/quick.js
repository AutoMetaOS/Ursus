import KEYS from "../constants";

export const get_metadata = async ( searchTerm ) => {
    const data = await fetch( `https://api.urlmeta.org/?url=${ searchTerm }`, {
        headers: {
            Authorization: `Basic ${ KEYS.API.urlmeta }`
        }
    } ).then( r => r.json() );

    return data;
};

export const search_suggestions = async ( term ) => {
    const Google_BASE = "https://www.google.com/complete/search?cp=6&client=gws-wiz&xssi=t&q=";
    const response = await fetch( Google_BASE + term ).then( d => d.text() );

    const json = response
        .split( "'" )[ 1 ]
        .replaceAll( '<b>', '' )
        .replaceAll( '</b>', '' );

    const reply = JSON.parse( json )[ 0 ].slice( 0, 2 );

    return reply;
}