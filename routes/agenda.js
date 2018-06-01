var express = require('express');
var mysql = require("mysql");
var router = express.Router();


router.get('/', function (req, res, next) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "web2"
    });
    con.connect(function (err) {
        if (err) throw err;
        con.query("SELECT * FROM phone_book", function (err, result, fields) {
            if (err) throw err;
            console.log(result);
            res.json(result);
        });
    });
});

router.post('/add', function (req, res, next) {
    var firstName = req.body.firstName;
    var lastName= req.body.lastName;
    var phone = req.body.phone;

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "web2"
    });

    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO phone_book (firstName,lastName,phone) VALUES (${firstName}, ${lastName},${phone})`;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

});

router.post('/delete', function (req, res, next) {
    //read
    const fs = require('fs');
    let rawdata = fs.readFileSync('phonebook.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);
    persons = persons.filter(function (person) {
        return person.id !== id
    });

    //save
    let data = JSON.stringify(persons, null, 2);
    fs.writeFileSync('phonebook.json', data);
    //return
    res.json(persons)
});

router.post('/update', function (req, res, next) {
    //read
    const fs = require('fs');
    let rawdata = fs.readFileSync('phonebook.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone = req.body.phone;

    let editPerson = persons.find(function (person) {
        return person.id === id;
    });

    editPerson.firstName = firstName;
    editPerson.lastName = lastName;
    editPerson.phone = phone;

    //save
    let data = JSON.stringify(persons, null, 2);
    fs.writeFileSync('phonebook.json', data);
    //return
    res.json(persons)
});

module.exports = router;
