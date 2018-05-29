/**
 * teams.js 
 * Module exports corresponding functions to index.js
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see index.js
 */


let teams = [
    { club: "Mariners", sport: "Baseball", founded: 1977 },
    { club: "Seahawks", sport: "Football", founded: 1974 },
    { club: "Seawolves", sport: "Rugby", founded: 2017 },
    { club: "Storm", sport: "Women's Basketball", founded: 1999 },
    { club: "Reign", sport: "Women's Soccer", founded: 2012 },
    { club: "Sounders", sport: "Soccer", founded: 2009 }
];

// displays all teams in array
exports.getAll = () => {
    return teams;
};

// finds and displays the team written in the query
exports.get = (c) => {
    if (c != '') {

    }
    var team = teams.find((team) => {
        return team.club.toLowerCase() == c;
    });
    return team;
};

// Deletes team written in the query
exports.delete = (r) => {
    var i = teams.findIndex((team) => {
        return team.club.toLowerCase() == r;
    });

    if (i >= 0) { //remove if team exists in array
        var removed = teams.splice(i, 2);
        return 'The ' + removed[0].club + ' have been removed. There are ' + teams.length + ' left.';

    } else { //else return 'No team found' if no teams or specific team not in array
        return 'No team found. Refresh and search again.';
    }

};