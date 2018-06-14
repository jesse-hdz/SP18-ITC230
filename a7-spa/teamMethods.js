const Teams = require("./models/Team.js");

exports.getAll = () => {
    return Teams.find({}, (err, result) => {
        if (err) {
            return err;
        }
        return result;
    });
};

exports.get = (c) => {
    Teams.findOne({ club: c }, (err, next, club) => {
        if (err) return next(err);
        return club;
    });
};

exports.delete = (c) => {
    let i = Teams.findOne({ club: c }, (err, team) => {
        return team.club.toLowerCase() == c;
    });

    if (i >= 0) { //remove if team exists in array
        let removed = Teams.splice(i, 2);
        return 'The ' + removed[0].club + ' have been removed.';

    } else { //else return 'No team found' if no teams or specific team not in array
        return 'No team found. Refresh and search again.';
    }
};