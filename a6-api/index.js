/**
 * index.js -- a6-api
 * Each route invokes the corresponding method in Team.js module 
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see Team.js
 * @see api.handlebars
 * @see add.handlebars
 * @see 404.handlebars
 * @see 500.handlebars
 */

const express = require('express'),
    handlebars = require('express-handlebars').create({ defaultLayout: 'main' }),
    // parser = require('body-parser'),
    // team = require('./lib/teams.js'),
    Team = require("./models/Team.js"),
    cors = require('cors');

const app = express();

// set up handlebars view engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views/public')); // set location for static files
app.use(cors());
app.use(require("body-parser").urlencoded({ extended: true })); // parse form submissions

// API Routes
// API - retrieves a single team
app.get('/api/team/:club', (req, res) => {
    let club = req.params.club;
    Team.find({ 'club': club }, (err, result) => {
        if (err) {
            return res.status(500).send('Error occurred: database error.');
        } else {
            res.json(result);
        }
    });
});

// API - retrieves all teams
app.get('/api/teams', (req, res, next) => {
    let t = Team.find((team) => {
        team.club = req.params.club;
        return {
            club: team.club,
            sport: t.sport,
            founded: t.founded,
            image: "/img/home.jpg"
        };
    });

    if (!t) return next(); // will eventually fall through to 404
    res.send(t);
});

// API - deletes a team
app.get('/api/delete/:club', (req, res) => {
    let club = req.params.club;
    Team.remove({ 'club': club }, (err, result) => {
        if (err) {
            return res.status(500).send('Error occurred: database error.');
        } else {
            res.json({ 'deleted': result });
        }
    });
});

// API - adds a team
app.post('/api/add', (req, res) => {
    let t = new Team({
        club: req.body.club,
        sport: req.body.sport,
        founded: req.body.founded,
        image: "/img/home.jpg",
        approved: false
    });
    t.save((err, t) => {
        if (err) return res.status(500).send('Error occurred: database error.');
        res.json({ id: t._id, });
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
