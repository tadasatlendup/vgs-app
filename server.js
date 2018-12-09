var request = require('request');
var restify = require('restify');
var restifyPlugins = require('restify-plugins');

var config = require('./config')


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
  console.log(data)
	res.send(data);
	next();
});

server.post('/send', (req, res, next) => {
  if (!req.is('application/json')) {
		return next(
			new errors.InvalidContentError("Expects 'application/json'"),
		);
	}

  request({
        method:'post',
        url:'https://' + config.vaultId + '.SANDBOX.verygoodproxy.com/post',
        headers: {"content-type": "application/json"},
        json: req.body,
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
            res.send(body);
          	next();
        }
    });
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
