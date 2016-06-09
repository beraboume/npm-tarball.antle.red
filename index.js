const express = require('express');
const favicon = require('serve-favicon');
const cors = require('cors');
const compression = require('compression');
const resolveUri = require('npm-tarball').resolveUri;

const port = process.env.PORT || 59798;
const app = express();

app.disable('etag');
app.disable('x-powered-by');
const packageResolver = (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');

  resolveUri(req.params.package, req.params.range)
  .then(uri => res.redirect(303, uri))
  .catch(error => res.status(404).end(error.message));
}

app.set('json spaces', 2);
app.use(favicon('favicon.ico'));
app.get('/:package/:range', packageResolver);
app.get('/:package', packageResolver);
app.get('/', (req,res)=> res.end('powerd by https://github.com/beraboume/npm-tarball.antle.red'));
app.listen(port, () => {
  console.log('listen to http://localhost:%s', port);
});
