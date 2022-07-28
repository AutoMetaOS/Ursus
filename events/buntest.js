// RUN WITH ONLY BUN
import { argv } from "bun";
import { spawnSync } from "node:child_process";

const args = argv.slice( 2 ).map( e => {
    if ( !e.includes( "--" ) ) return e;
    const [ k, v ] = e.split( "=" );
    return { [ k ]: v || true }
} );
const { exit, version } = process;

console.log( version );
console.log( args );

if ( process.platform !== "darwin" ) exit(); // only run on mac
/////////////////////////////////////////////////////////////////