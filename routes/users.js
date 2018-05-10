var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/tabla-inmultirii', function(req, res, next) {
var response = '';
    for (var i=1;i<=10;i++) {
        response += '2*' + i + '=' + 2 * i+';'+'<br>'
    };
    res.send(response)
}

)

router.get('/create', function(req, res, next) {
  //TODO
    res.json({id : '123', name : 'Matei'});
});

module.exports = router;
