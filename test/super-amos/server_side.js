import { match, jfetcher, tfetcher } from "./rules.js";


const inserter = ( d ) => document.querySelector( '#results' ).insertAdjacentHTML( 'beforeend', d );
const tabler = ( data ) => {
    const color = data.Result === 'Pass' ? 'green' : 'red';

    inserter( `
    <div class="card fade-left †l">
        <h3 class="fw4 p10">${ data.Category }</h3>
        <div class="name p10">${ data.Name }</div>
        <div class="result ${ color } p10">${ data.Result }</div>
    </div>`);

    return 0;
};

const table = [];
class Output {
    constructor ( cat, name, result ) {
        this.Category = cat;
        this.Name = name;
        this.Result = result ? 'Pass' : false;

        tabler( this );
    }
};

// Variable, Function, Object, Array
const auto_processor = async ( endpoint, mapper, matcher, struct ) => {
    let filtr;

    if ( typeof endpoint !== 'string' ) {
        const data = await jfetcher( endpoint.url );
        filtr = data instanceof Array ?
            data.map( mapper ) : mapper( data );
    }
    else filtr = await tfetcher( endpoint );

    const result = match[ matcher.type ]( filtr, matcher.value );
    return new Output( ...struct, result );
};

const quick_tests = async () => {
    const promise1 = await auto_processor(
        { url: 'quick/suggest?einste' },
        ( e ) => e[ 0 ].replace( /<\/?[^>]+(>|$)/g, "" ),
        { type: 'str_in_arr', value: 'einstein' },
        [ 'Quick', 'Search' ]
    );

    const promise2 = await auto_processor(
        { url: 'quick/metadata?url=https://cmos.nukes.in' },
        ( e ) => e.meta?.site.favicon,
        { type: 'str_in_str', value: 'Amos' },
        [ 'Quick', 'Favicon' ]
    );

    return 0;
};
const content_tests = async () => {
    const promise1 = await auto_processor(
        'cms/css?name=keyframes.css',
        null,
        { type: 'str_in_str', value: 'fade-right' },
        [ 'Content', 'CSS' ]
    );
};
const social_tests = async () => {
    const promise1 = await auto_processor(
        { url: 'social/twitter?id=1519495072802390016' },
        ( e ) => e.text,
        { type: 'str_in_str', value: 'maximum' },
        [ 'Social', 'Twitter' ]
    );

    return 0;
};


Promise.all( [
    quick_tests(),
    // content_tests(),
    social_tests()
] ).then( () => {
    console.table( table );

    const number_of_tests = table.length;
    const number_of_passed = table.filter( e => e.Result === 'Pass' ).length;
    const pct = ~~( 100 * number_of_passed / number_of_tests );

    console.log( `${ pct }%: ${ number_of_passed } out of ${ number_of_tests } passed` );
} );