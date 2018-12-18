var restify = require('restify');
var restifyPlugins = require('restify-plugins');

var server = restify.createServer();
server.use(restifyPlugins.jsonBodyParser({ mapParams: true }));
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser({ mapParams: true }));
server.use(restifyPlugins.fullResponse());

server.post('/data', (req, res, next) => {
  if (!req.is('application/json')) {
    return next(
      new errors.InvalidContentError("Expects 'application/json'"),
    );
  }

  var data = req.body || {};
  console.log(data);
  res.send(data);
  next();
});

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
