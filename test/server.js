import Koa from "koa";
import serve from "koa-static";

const app = new Koa();

app.use( serve( '.' ) );

app.listen( 3000 );

console.log( 'listening on port 3000' );