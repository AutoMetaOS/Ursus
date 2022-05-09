import fetch from "node-fetch";
import fs from "fs";

fetch( 'http://twitter.com/elonmusk/' )
    .then( r => r.text() )
    .then( d => fs.writeFileSync( 'test.html', d ) );