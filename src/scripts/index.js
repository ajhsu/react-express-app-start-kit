// Babel polyfill includes a custom regenerator runtime (which asyn-await syntax needs) and core-js.
// https://babeljs.io/docs/usage/polyfill/
require('babel-polyfill');
require('./app');