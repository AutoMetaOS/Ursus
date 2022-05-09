export const match = {
    str_in_arr: ( values, expect ) => values?.filter( a => a.toLowerCase().includes( expect ) ).length > 0,
    str_in_str: ( value, expect ) => value?.includes( expect ),
};


export const fetche = async ( end, opts ) => {
    let point;
    if ( opts?.bypass ) {
        point = `/bypass?${ end.includes( '::' ) ? end : 'json::' + end }`;
    } else point = `https://api.nukes.in/${ end }`;

    const response = await fetch( point );
    let data;
    console.log( opts );
    if ( opts?.type === 'json' || !opts.type ) data = response.json();
    else data = response.text();

    return data;
};