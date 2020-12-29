const algoliasearch = require("algoliasearch");
const fs = require('fs');
const glob = require('glob-fs')({ gitignore: true });
const toml = require('toml');

const files = glob.readdirSync('../manifests/**/*.toml');
const contents = files.map(f => fs.readFileSync(f, 'utf8'));
const tomls = contents.map(c => toml.parse(c));

(async () => {
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    const index = client.initIndex("packages");
    await index.saveObjects(tomls, { autoGenerateObjectIDIfNotExist: true });
})();
