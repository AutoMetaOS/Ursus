import fetch from "node-fetch";

fetch( 'https://api.nukes.in/cms/css?name=keyframes.css' )
    .then( r => r.text() )
    .then( console.log )