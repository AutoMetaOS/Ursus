export const getKeys = async ( ns, values = false ) => {
    const all = await ns.list();
    const keys = all.keys.map( e => e.name );

    if ( values === false ) return keys;

    if ( values ) {
        let result = [];

        const values = await Promise.all( keys.map( e => ns.get( e ) ) );

        for ( let i = 0;i < values.length;i++ )
            result.push( values[ i ].replace( /.$/, `,"id":"${ keys[ i ] }"}` ) );

        return `[${ result.join( ',' ) }]`;
    }
};

/*
const array = [
    { name: "foo1", value: "val1" },
    {
        name: "foo1",
        value: [ "val2", "val3" ]
    },
    { name: "foo2", value: "val4" }
];

const output = [
    {
        name: "foo1",
        value: [ "val1", "val2", "val3" ]
    },
    { name: "foo2", value: [ "val4" ] }
];
*/
export const arrayMerge = ( array, matchBy, combineTo ) => {
    let output = [];

    array.forEach( function ( item ) {
        let existing = output.filter( v => v[ matchBy ] == item[ matchBy ] );

        if ( existing.length ) {
            let existingIndex = output.indexOf( existing[ 0 ] );

            output[ existingIndex ][ combineTo ] =
                output[ existingIndex ][ combineTo ]
                    .concat( item[ combineTo ] );
        }
        else {
            if ( typeof item[ combineTo ] == 'string' )
                item[ combineTo ] = [ item[ combineTo ] ];

            output.push( item );
        };
    } );

    return output;
}

const defaultHeaders = {
    "content-type": "application/json;charset=UTF-8",
    'Access-Control-Allow-Origin': "*"
};

export const Respond = ( data, headers = defaultHeaders ) => new Response(
    typeof data === "object" ? JSON.stringify( data ) : data,
    { headers }
);

export const transformer = ( stringArray, stack ) => {
    const objectArray = stringArray.map( JSON.parse );

    const { type, source, cover } = objectArray[ 0 ] || objectArray;
    const metadata = {
        type,
        source,
        cover
    };

    if ( typeof objectArray[ 0 ] == 'object' ) null;
    else return { data: objectArray, metadata };
    const data = objectArray.map( ( e, i ) => {
        return {
            id: stack[ i ],
            title: e?.title || "NO TITLE"
        };
    } );
    return {
        data,
        metadata
    };
};

export const match = ( actual, expect ) => actual.startsWith( expect );
export const getPart = id => id.split( '-' )[ 1 ].slice( 0, 3 );