import { preprocessor } from "./rules.js";

const target = document.querySelector( '#results' );

const quick_tests = async () => {
    const promise1 = await preprocessor(
        { url: 'quick/suggest?einste' },
        ( e ) => e[ 0 ].replace( /<\/?[^>]+(>|$)/g, "" ),
        { type: 'str_in_arr', value: 'einstein' },
        [ 'Quick', 'Search' ]
    );

    const promise2 = await preprocessor(
        { url: 'quick/metadata?url=https://cmos.nukes.in' },
        ( e ) => e.meta?.site.favicon,
        { type: 'str_in_str', value: 'Amos' },
        [ 'Quick', 'Favicon' ]
    );

    return 0;
};
const content_tests = async () => {
    const promise1 = await preprocessor(
        { url: 'cms/css?name=keyframes.css', type: 'text', bypass: true },
        null,
        { type: 'str_in_str', value: 'fade-right' },
        [ 'Content', 'CSS' ]
    );
    const promise2 = await preprocessor(
        { url: 'cms/icon?name=amos:infinity.svg', type: 'text', bypass: true },
        null,
        { type: 'str_in_str', value: 'linearGradient id="a"' },
        [ 'Content', 'Iconset' ]
    );
};
const social_tests = async () => {
    const promise1 = await preprocessor(
        { url: 'social/twitter?id=1519495072802390016' },
        ( e ) => e.text,
        { type: 'str_in_str', value: 'maximum' },
        [ 'Social', 'Twitter' ]
    );

    return 0;
};


Promise.all( [
    quick_tests(),
    content_tests(),
    social_tests()
] ).then( () => {
    console.table( table );

    const number_of_tests = table.length;
    const number_of_passed = table.filter( e => e.Result === 'Pass' ).length;
    const pct = ~~( 100 * number_of_passed / number_of_tests );

    const div = document.createElement( 'div' );
    div.innerHTML = `Tests ${ pct }% \n ${ number_of_passed } out of ${ number_of_tests } passed`;
    target.appendChild( div );
} );