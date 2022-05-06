touch .cargo-ok;

npm run build;
npx wrangler publish index.js;

rm -rf worker/ dist/ .cargo-ok index.js;