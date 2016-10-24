// Babel polyfill includes a custom regenerator runtime (which asyn-await syntax needs) and core-js.
// https://babeljs.io/docs/usage/polyfill/
require('babel-polyfill');

// Transform ES2016 as long as React JSX into ES5
require('babel-register')();

// Auto requiring all *.spec.js files into testing
const glob = require('glob');
glob.sync(`**/*.spec.js`, {
  cwd: `./src/scripts/tests`
}).map(path => require(`./${path}`));
