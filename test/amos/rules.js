const target = document.querySelector( '#results' );

export class Output {
    constructor ( cat, name, result ) {
        this.Category = cat;
        this.Name = name;
        this.Result = result ? 'Pass' : false;

        const data = this;
        table.push( data );
        new MegaCard( { target, props: { data } } )
    };
};

export const preprocessor = async ( endpoint, mapper, matcher, struct ) => {
    let filtr;

    const prefix = endpoint.bypass ? `${ endpoint.type || 'json' }::` : '';
    const data = await fetche( `${ prefix }${ endpoint.url }`, {
        type: endpoint?.type || 'json',
        bypass: endpoint?.bypass || false
    } );

    if ( endpoint?.type === 'json' || !endpoint.type )
        filtr = data instanceof Array ?
            data.map( mapper ) : mapper( data )
    else filtr = data;

    const result = match[ matcher.type ]( filtr, matcher.value );
    return new Output( ...struct, result );
};


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
    if ( opts?.type === 'json' || !opts.type ) data = response.json();
    else data = response.text();

    console.log( await data );
    return data;
};