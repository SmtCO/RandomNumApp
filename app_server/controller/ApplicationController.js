var io = require('socket.io')

module.exports.index = async function(req, res){

    var Currency = require('../models/currency');
    
    Currency.find({}, function(err, result) {
        if (err) throw err;
        res.render('currency', {Currency:result});
      });
}