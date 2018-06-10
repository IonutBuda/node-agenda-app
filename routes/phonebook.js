var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    const fs = require ('fs');
    let rawdata = fs.readFileSync('phonebook.json');
    let phoneBooks = JSON.parse (rawdata);
    res.json(phoneBooks);
});

router.post('/add',function (req,res,next){
      //read
      const fs = require ('fs');
      let rawdata = fs.readFileSync('phonebook.json');
      let phoneBooks = JSON.parse (rawdata);



      phoneBooks.push({
          id : new Date().getTime(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone:req.body.phone
      });
      //save
      let data = JSON.stringify(phoneBooks, null, 2);
      fs.writeFileSync('phonebook.json', data);
      //return
      res.writeHead(301,
          {Location: '/phonebook.html'}
          );
      res.end();
});

router.post('/delete',function (req,res,next){
    //read
    const fs = require ('fs');
    let rawdata = fs.readFileSync('phonebook.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);
    persons = persons.filter(function(person){
        return person.id !==id
    });

    //save
    let data = JSON.stringify(persons, null, 2);
    fs.writeFileSync('phonebook.json', data);
    //return
    res.json(persons)
});

router.post('/update',function (req,res,next){
    //read
    const fs = require ('fs');
    let rawdata = fs.readFileSync('phonebook.json');
    let persons = JSON.parse(rawdata);

    const id = parseInt(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phone=req.body.phone;

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
