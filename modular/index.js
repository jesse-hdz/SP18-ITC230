var http = require('http'),
    fs = require('fs'),
    records = require('./lib/records.js');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer(function(req, res) {
    // normalize url by removing querystring, optional trailing slash, and making it lowercase
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html');
            break;

        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;

        case '/get':
            serveStaticFile(res, '/public/get.html', 'text/html');
            break;

        case '/delete':
            serveStaticFile(res, '/public/delete.html', 'text/html');
            break;

        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404);
            break;
    }

}).listen(process.env.PORT || 3000);

// console.log('Server started on localhost:3000; press Ctrl-C to terminate...');