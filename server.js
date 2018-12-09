var restify = require('restify');
var restifyPlugins = require('restify-plugins');

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

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
	res.send(data);
	next();
});

// server.post('/send', (req, res, next) => {
// 	res.send(200);
// 	next();
// });

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
