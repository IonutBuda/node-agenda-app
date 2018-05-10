var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
var response = '';
    for (var i=1;i<=10;i++) {
        response += '2*' + i + '=' + 2 * i+';'+'<br>'
    };
    res.send(response)
}

);
module.exports = router;
