import KEYS from "../lib/standards";

export const get_metadata: object = async ( searchTerm: string ) => {
    const data: object = await fetch( `https://api.urlmeta.org/?url=${ searchTerm }`, {
        headers: {
            Authorization: `Basic ${ KEYS.API.urlmeta }`
        }
    } ).then( r => r.json() );

    return data;
};

export const search_suggestions: object = async ( term: string ) => {
    const Google_BASE: string = "https://www.google.com/complete/search?cp=6&client=gws-wiz&xssi=t&q=";
    const response: string = await fetch( Google_BASE + term ).then( d => d.text() );

    const json: string = response
        .split( "'" )[ 1 ]
        .replaceAll( '<b>', '' )
        .replaceAll( '</b>', '' );

    const reply: Array<string> = JSON.parse( json )[ 0 ].slice( 0, 2 );

    return reply;
}