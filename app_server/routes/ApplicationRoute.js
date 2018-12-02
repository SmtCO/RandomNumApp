var express = require('express');

var router = express.Router();

var controller = require('../controller/ApplicationController');


router.use(function(req, res, next){

    req.test = 'App Route';
    
    next();
});

router.get('/', controller.index);

router.get('/computer', controller.computer);

module.exports = router;
