/**
 * index.js -- a3-express
 * Each route invokes the corresponding method in teams.js module 
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see teams.js
 * @see main.handlebars
 * @see home.handlebars
 * @see details.handlebars
 * @see about.handlebars
 * @see 404.handlebars
 * @see 500.handlebars
 * @todo add 'details.handlebars' to views directory
 */

const express = require('express'),
    handlebars = require('express-handlebars').create({ defaultLayout: 'main' }),
    parser = require('body-parser'),
    team = require('./views/public/lib/teams.js');

const app = express();

// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views/public')); // set location for static files

app.use(require("body-parser").urlencoded({ extended: true })); // parse form submissions


// Routes
// home / search bar page
app.get('/', (req, res) => {
    res.render('home');
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Search for teams displayed on home page
app.post('/search', (req, res) => {
    let result = team.get(req.body.club.toLowerCase());

    if (!(team.get(req.body.club))) {
        res.send('The Seattle ' + req.body.club + ' is not found. <br/> Please search for another team.');
    } else {
        res.render('details', { title: req.body.club, result: result });
    }
});

// query get page to retrieve specific team (when input in query string in url)
app.get('/get', (req, res) => {
    res.type('text/html');
    let result = team.get(req.query.club);
    res.render('details', { title: req.query.club, result: result });
});

// displays team information entered in search bar
app.get('/details', (req, res) => {
    res.render('details', {
        Club: team,
        Info: teamInfo
    });
});

// displays JSON of all teams
app.get('/getall', (req, res) => {
    // var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    // res.render('about', { fortune: randomFortune });
    res.end('All Professional Seattle teams: \n\n ' + JSON.stringify(team.getAll(), null, 2));
    res.render('Get All');
});

// deletes team if button is clicked on 'details' page
app.post('/delete', (req, res) => {
    let result = team.get(req.body.club);
    let r = team.delete(result);

    if (!r.deleted) {
        res.send("The Seattle " + JSON.stringify(result, null, 2) + " are not in our records.");
    } else {
        res.send("The Seattle " + JSON.stringify(result, null, 2) + " have been removed.");
    }
});

// define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// 500 error handler (middleware) 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
});
