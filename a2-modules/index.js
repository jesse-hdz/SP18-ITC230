/**
 * index.js 
 * Each route invokes the corresponding method in teams.js module 
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see teams.js
 */

var http = require('http'),
    fs = require('fs'),
    qs = require('querystring'),
    team = require('./public/lib/teams.js');

// import http from 'http';
// import fs from 'fs';
// import qs from 'querystring';
// import team from './public/lib/teams.js';

function serveStatic(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}

http.createServer((req, res) => {
    let url = req.url.toLowerCase().split("?"); // splits path from query string
    let path = url[0]; // path before query
    let query = qs.parse(url[1]); // query string attached to obtain object
    let r = team.get(query.club); // club query to print object
    // let display = query.club.toUpperCase(); // caps all
    // let display = query.club.charAt(0).toUpperCase() + query.club.substr(1).toLowerCase(); //caps only first letter

    switch (path) {
        case '/':
            serveStatic(res, '/../public/home.html', 'text/html');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        case '/getall':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('All Professional Seattle teams: \n\n ' + JSON.stringify(team.getAll(), null, 2));
            break;
        case '/get':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Team Seattle ' + query.club + ': \n\n ' + JSON.stringify(r, null, 2));
            break;
        case '/delete':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(team.delete(query.club));
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404:Page not found.');
    }

}).listen(process.env.PORT || 3000);