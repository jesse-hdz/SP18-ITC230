/**
 * teams.js 
 * Module exports corresponding functions to index.js
 * and sends the returned value on the server response.
 *
 * @author Jesse Hernandez
 * @see index.js
 */

let teams = [
    { club: "Mariners", sport: "Baseball", founded: 1977, image: "/img/mariners.png" },
    { club: "Seahawks", sport: "Football", founded: 1974, image: "/img/seahawks.png" },
    { club: "Seawolves", sport: "Rugby", founded: 2017, image: "/img/seawolves.png" },
    { club: "Storm", sport: "Women's Basketball", founded: 1999, image: "/img/storm.png" },
    { club: "Reign", sport: "Women's Soccer", founded: 2012, image: "/img/reign.svg" },
    { club: "Sounders", sport: "Men's Soccer", founded: 2009, image: "/img/sounders.png" }
];

// displays all teams in array
exports.getAll = () => {
    return teams;
};

// finds and displays the team written in the query
exports.get = (c) => {
    let team = teams.find((team) => {
        if (!team) {
            return false;
        } else {
            return team.club.toLowerCase() == c;
        }

    });
    return team;
};

// Deletes team written in the query
exports.delete = (c) => {
    let i = teams.findIndex((team) => {
        return team.club.toLowerCase() == c;
    });

    if (i >= 0) { //remove if team exists in array
        let removed = teams.splice(i, 2);
        return 'The ' + removed[0].club + ' have been removed.';

    } else { //else return 'No team found' if no teams or specific team not in array
        return 'No team found. Refresh and search again.';
    }
};

exports.add = (c) => {
    // attaches items from user input to the new team added
    let newTeam = {
        Club: c.club,
        Sport: c.sport,
        Founded: c.founded,
        Image: c.image
    };

    // checks team club name against array to see if it already exists
    let check = teams.find(team => team.club == newTeam.club);

    // new team is added if it does not already exist
    if (!check) {
        teams.push(newTeam);
        return teams;
    } else { // message output if team already in array
        return 'Team already in system';
    }
};