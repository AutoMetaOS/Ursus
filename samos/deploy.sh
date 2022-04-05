touch .cargo-ok;

npm run build;
npx wrangler publish;

rm -rf worker/ dist/ .cargo-ok index.js;