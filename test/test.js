const expect = require("chai").expect,
    team = require("../lib/teams");

describe('Teams module', () => {
    it('returns requested team', () => {
        let club = 'storm';
        let result = team.get(club);
        expect(result).to.deep.equal({
            club: 'Storm',
            sport: "Women's Basketball",
            founded: 1999,
            image: "/img/storm.png"
        });
    });

    it('fails w/ invalid team name', () => {
        let result = team.get('fake');
        expect(result).to.be.undefined;
    });

    it('deletes requested team', () => {
        let result = team.delete('storm');
        expect(result.deleted).to.be.undefined;
    });

    it('fails to delete invalid team', () => {
        let result = team.delete('fake');
        expect(result.deleted).to.be.undefined;
    });

    it('adds requested team', () => {
        let result = team.add({ Club: "Totems", Sport: "Hockey", Founded: 1974, Image: "/img/home.jpg" });
        expect(result.added).to.be.true;
    });

    it('fails to add existing team', () => {
        let result = team.add({
            club: 'Storm',
            sport: "Women's Basketball",
            founded: 1999,
            image: "/img/storm.png"
        });
        expect(result.added).to.be.undefined;
    });
});