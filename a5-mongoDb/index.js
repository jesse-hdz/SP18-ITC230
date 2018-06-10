/**
 * index.js -- a5-mongoDb
 * Each route invokes the corresponding method in Team.js module 
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see Team.js
 * @see main.handlebars
 * @see home.handlebars
 * @see details.handlebars
 * @see about.handlebars
 * @see add.handlebars
 * @see 404.handlebars
 * @see 500.handlebars
 */

const express = require('express'),
    handlebars = require('express-handlebars').create({ defaultLayout: 'main' }),
    // parser = require('body-parser'),
    // team = require('./lib/teams.js'),
    Team = require("./models/Team.js"),
    teamMethods = require("./teamMethods");

const app = express();

// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views/public')); // set location for static files

app.use(require("body-parser").urlencoded({ extended: true })); // parse form submissions


// Routes
// home / search bar page
// app.get('/', (req, res) => {
//     res.render('home');
// });

// home / search bar page (to use Teams db (mongoDb))
app.get('/', (req, res, next) => {
    teamMethods.getAll().then((teams) => {
        res.render('home', { teams: teams });
    }).catch((err) => {
        return next(err);
    });
});

// about page
app.get('/about', (req, res) => {
    res.render('about');
});

// Search for teams displayed on home page
app.post('/search', (req, res, next) => {
    let result = req.body.club;

    Team.findOne({ title: result }, (err, club) => {
        if (err) return next(err);
        res.render('details', { result: club });

    });
});

// query get page to retrieve specific team (when input in query string in url)
app.get('/get', (req, res) => {
    let result = Team.get(req.query.club);
    res.render('details', { title: req.query.club, result: result });
});

// displays team information entered in search bar
app.post('/details', (req, res, next) => {
    Team.findOne({ club: (String(req.body.club)) }, (err, team) => {
        if (err) return next(err);
        res.render('details', { result: team });
    });
});

// deletes team if button is clicked on 'details' page
app.post('/delete', (req, res, next) => {
    Team.delete({ club: req.body.club }, (err, result) => {
        if (err) return next(err);
        let deleted = result;

        if (deleted) {
            res.send('Team has been deleted: ', { club: req.body.club });
        } else {
            res.send('Team has not been deleted: ', { club: req.body.club });
        }

    });
});

// adds a team
app.post('/add', (req, res) => {
    let club = req.body.club,
        sport = req.body.sport,
        founded = req.body.founded,
        image = "/img/home.jpg";

    let add = true;
    // add 'club', 'sport', 'founded', 'image' to array of teams    
    let result = Team.add({ club, sport, founded, image });
    res.render('details', {
        title: result,
        club: club,
        sport: sport,
        founded: founded,
        image: image,
        add: add
    });
});

// define 404 handler
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not found');
});

// 500 error handler (middleware) 
app.use((err, req, res) => {
    Error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost: ' + app.get('port') + '; press Ctrl-C to terminate');
});