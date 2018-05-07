var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //TODO
  res.send('in curand voi da lista');

  router.get('/add',function (req,res,next){
      //read
      const fs = require ('fs');
      let rawdata = fs.readFileSync(".public/js/mocks/phone-book.json");
      let phoneBooks = JSON.parse (rawdata);


      //update
      phoneBooks.push({
          id :"100",
          firstName: 'xxx',
          lastName:'YYY',
          phone:"876"
      });
      //save
      let data = JSON.strigify(phoneBooks,null,2);
      fs.writeFileSync("data/phonebook.json",data);
      //return
      res.json(phoneBooks)
  })
});

module.exports = router;
