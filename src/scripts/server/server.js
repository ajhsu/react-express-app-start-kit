import express from 'express';
import path from 'path';
import rewriteModule from 'http-rewrite-middleware';

const app = express();
const HOST = '0.0.0.0';
const PORT = 8888;

// Static files
app.use(`/scripts`, express.static(path.join(__dirname, `../../../dist/scripts`)));
app.use(`/styles`, express.static(path.join(__dirname, `../../../dist/styles`)));
app.use(`/fonts`, express.static(path.join(__dirname, `../../../dist/fonts`)));
app.use(`/images`, express.static(path.join(__dirname, `../../../dist/images`)));
app.use(`/robots.txt`, express.static(path.join(__dirname, `../../../dist/robots.txt`)));
app.use(`/favicon.ico`, express.static(path.join(__dirname, `../../../dist/favicon.ico`)));

// Rewrite request of sub-directory's files to the root path
// app.use(rewriteModule.getMiddleware([
//   {from: '^.*\/(.*)$', to: '/$1'}
// ]));

// Catches all exceptions to index.html
app.get('*', (request, response, next) => {
  const fileName = path.join(__dirname, '../../index.html');
  response.sendFile(fileName);
});

// Listen for Connection
// ---------------------

app.listen(PORT, HOST, error =>
  console.log(error || `Listening at http://${HOST}:${PORT}`)
);
