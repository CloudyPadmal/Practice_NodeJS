var http = require('http');
var url = require('url');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var firstEvent = function () {
    console.log('First event!');
}

var secondEvent = function () {
    console.log('Second event!');
}

var example = 'http://localhost:8080/?param=first';

eventEmitter.on('first', firstEvent);
eventEmitter.on('second', secondEvent);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var q = url.parse(req.url, true);
    var o = q.query;
    eventEmitter.emit(o.param);
    res.end('Done!');
}).listen(8080);
