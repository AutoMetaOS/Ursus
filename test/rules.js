import fetch from 'node-fetch';

export const match = {
    str_in_arr: ( values, expect ) => values?.filter( a => a.toLowerCase().includes( expect ) ).length > 0,
    str_in_str: ( value, expect ) => value?.includes( expect ),
};

export const jfetcher = ( end ) => fetch( `https://super-amos.nukesapi.workers.dev/${ end }` ).then( r => r.json() );
export const tfetcher = ( end ) => fetch( `https://super-amos.nukesapi.workers.dev/${ end }` ).then( r => r.json() );