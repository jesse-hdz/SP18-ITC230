var records = [

    { title: "Tutu", musician: "Miles Davis", released: 1986 },
    { title: "True Blue", musician: "Tina Brooks", released: 1960 },
    { title: "Bird & Diz", musician: "Charlie Parker", released: 1952 },
    { title: "UNITY", musician: "Larry Young", released: 1966 },
    { title: "Undercurrent", musician: "Jim Hall", released: 1962 },
    { title: "Somethin' Else", musician: "Cannonball Adderley", released: 1958 },
    { title: "Laughing in Rhythm", musician: "Slim Gilliard", released: 1994 },
    { title: "The Sidewinder", musician: "Lee Morgan", released: 1964 },
    { title: "Roy & Diz #2", musician: "Roy Eldridge", released: 1954 },
    { title: "Relaxin' With The Miles Davis Quintet", musician: "Miles Davis", released: 1958 }

];

exports.numRecords = records.length;

exports.getAllRecords = () => {
    records.forEach((record) => {
        console.log("Title: " + record.title + "<br>Musician: " + record.musician + "<br>Year Released: " + record.released);
    });
};

exports.getRecord = (record) => {
    records.find((title) => {
        return record.title == 'Tutu';
    });
};

exports.deleteRecord = (record) => {

};