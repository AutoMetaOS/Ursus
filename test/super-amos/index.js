import { match, jfetcher, tfetcher } from "../rules.js";

function Result ( cat, name, result ) {
    this.Category = cat;
    this.Name = name;
    this.Result = result ? 1 : false;
};
const table = [];

const quick_tests = async () => {
    const data = await jfetcher( 'quick/suggest?Albert' )
    const filtr = data.map( e => e[ 0 ].replace( /<\/?[^>]+(>|$)/g, "" ) );
    console.log( filtr );
    const result_1 = match.str_in_arr( filtr, 'einstein' );
    table.push( new Result( 'Quick', 'Search', result_1 ) );

    const data2 = await jfetcher( 'quick/metadata?url=https://amos.nukes.in' );
    const filtr2 = data2.meta.site.favicon;
    const result_2 = match.str_in_str( filtr2, 'Amos' );
    table.push( new Result( 'Quick', 'Favicon', result_2 ) );

    return result_1 && result_2;
};


Promise.all( [
    quick_tests(),
] ).then( () => console.table( table ) );