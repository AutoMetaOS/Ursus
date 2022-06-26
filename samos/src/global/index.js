const B64 = {
    alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    // rlookup was created using LookupFactory.buildRlookup(false)
    rlookup: [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 43, 47, 61 ],
    // rlookup was created using LookupFactory.buildRlookup(true)
    urlrlookup: [ 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 95, 61 ],
    // lookup was created using LookupFactory.buildLookup()
    lookup: [ null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 62, null, 62, null, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, null, null, null, 64, null, null, null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, null, null, null, null, 63, null, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, null, null ],

    encode: function ( s, options ) {
        let buffer = typeof s === 'string' ? B64.toUtf8( s ) : s
        let position = -1
        let len
        let result
        let rlookup
        let nan0, nan1, nan2

        len = buffer.length

        result = new Uint8Array( new ArrayBuffer( Math.ceil( len / 3 ) * 4 ) )
        rlookup = B64.rlookup
        if ( options && options.url ) {
            // spot the subtle difference :)
            result = new Uint8Array( new ArrayBuffer( Math.ceil( 4 * len / 3 ) ) )
            rlookup = B64.urlrlookup
        }

        let i = 0
        while ( ++position < len ) {
            nan0 = buffer[ position ]
            nan1 = buffer[ ++position ]
            result[ i++ ] = rlookup[ nan0 >> 2 ]
            result[ i++ ] = rlookup[ ( ( nan0 & 3 ) << 4 ) | ( nan1 >> 4 ) ]
            if ( isNaN( nan1 ) ) {
                result[ i++ ] = rlookup[ 64 ]
                result[ i++ ] = rlookup[ 64 ]
            } else {
                nan2 = buffer[ ++position ]
                result[ i++ ] = rlookup[ ( ( nan1 & 15 ) << 2 ) | ( nan2 >> 6 ) ]
                result[ i++ ] = rlookup[ ( isNaN( nan2 ) ) ? 64 : nan2 & 63 ]
            }
        }

        return new TextDecoder( 'utf8' ).decode( result )
    },

    decode: function ( s, options ) {
        s = s.replace( /\s/g, '' )
        if ( s.length % 4 ) {
            throw new Error( 'InvalidLengthError: decode failed: The string to be decoded is not the correct length for a base64 encoded string.' )
        }
        if ( /[^A-Za-z0-9+\/\-_=]/g.test( s ) ) { // eslint-disable-line
            throw new Error( 'InvalidCharacterError: decode failed: The string contains characters invalid in a base64 encoded string.' )
        }
        return B64.decodeCommon( s, options )
    },

    toUtf8: function ( s ) {
        return new TextEncoder( 'utf8' ).encode( s )
    },

    decodeCommon: function ( s, options ) {
        let position = -1
        let array = new ArrayBuffer( s.length / 4 * 3 )
        let len
        let buffer = new Uint8Array( array )
        let i = 0
        let enc0, enc1, enc2, enc3

        len = s.length
        while ( ++position < len ) {
            enc0 = B64.lookup[ s.charCodeAt( position ) ]
            enc1 = B64.lookup[ s.charCodeAt( ++position ) ]
            buffer[ i++ ] = ( enc0 << 2 ) | ( enc1 >> 4 )
            enc2 = B64.lookup[ s.charCodeAt( ++position ) ]
            if ( enc2 === 64 ) { break }
            buffer[ i++ ] = ( ( enc1 & 15 ) << 4 ) | ( enc2 >> 2 )
            enc3 = B64.lookup[ s.charCodeAt( ++position ) ]
            if ( enc3 === 64 ) { break }
            buffer[ i++ ] = ( ( enc2 & 3 ) << 6 ) | enc3
        }

        let uint8Array = new Uint8Array( array, 0, i )

        if ( options && options.uint8Array ) {
            return uint8Array
        }

        return new TextDecoder( 'utf8' ).decode( uint8Array )
    }
}; export const b64 = {
    encode: B64.encode,
    decode: B64.decode
};

// FOR AUTH
export const rawLength = ( str ) => str.replaceAll( "0", " " ).trimEnd().replaceAll( " ", "0" );
export const fixLength = ( key, len = 24 ) => {
    let str = "";
    const loop = len - key.length;

    if ( loop > 0 ) {
        for ( let i = 0;i < loop;i++ )
            str += "0";

        return ( key + str )
    }
    else return key.substring( 0, len );
};
const fuzzy = ( probability = 0.5 ) => Math.round( Math.random() < probability );

export const getRandomSubstring = ( key, probability = 0.25 ) => {
    let subst = "";
    for ( let i = 0;i < key.length;i++ ) {
        subst += fuzzy( probability ) ? key.charAt( i ) : '';
    }

    return subst;
};

export const orderCheck = ( matchFrom, matchBy ) => {
    const all = ( arr ) => arr.every( v => v === true );
    const any = ( arr ) => arr.some( v => v === true );

    let s2 = [];
    for ( let ch in matchBy ) { //all
        let s1 = [];
        for ( let v in matchFrom ) //any
            s1.push( v == ch )
        s2.push( any( s1 ) );
    };

    return all( s2 );
}