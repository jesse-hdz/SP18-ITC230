/**
 * index.js -- a7-spa
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
    handlebars = require('express-handlebars'),
    bodyParser = require("body-parser"),
    Team = require("./models/Team.js"),
    app = express();

// set up handlebars view engine
app.engine('html', handlebars({ extname: '.html' }));
app.set('view engine', '.html');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/views')); // set location for static files
app.use(bodyParser.json());
app.use(require("body-parser").urlencoded({ extended: true })); // parse form submissions
app.use('/api', require('cors')());

// Routes
// home / search bar page
// app.get('/', (req, res) => {
//     res.render('home');
// });

// home / search bar page (to use Teams db (mongoDb))
app.get('/', (req, res, next) => {
    res.type('text/html');
    Team.find().then((teams) => {
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
    res.type('text/html');
    Team.findOne({ club: (String(req.body.club)) }, (err, team) => {
        if (err) return next(err);
        res.render('details', { result: team });
    });
});

// deletes team if button is clicked on 'details' page
app.post('/delete', (req, res, next) => {
    res.type('text/html');
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
    res.type('text/html');
    res.render('details', {
        title: result,
        club: club,
        sport: sport,
        founded: founded,
        image: image,
        add: add
    });
});


// API Routes
// API - retrieves a single team
app.get('/api/v1/team/:club', (req, res) => {
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
app.get('/api/v1/teams', (req, res, next) => {
    let t = Team.find((team) => {
        team.club = req.params.club;
        return {
            club: t.club,
            sport: t.sport,
            founded: t.founded,
            image: "/img/home.jpg"
        };
    });

    if (!t) return next(); // will eventually fall through to 404
    res.json(t);
});

// API - deletes a team
app.get('/api/v1/delete/:club', (req, res) => {
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
app.post('/api/v1/add', (req, res) => {
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