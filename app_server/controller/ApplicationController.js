var path = require('path');

module.exports.index = function(req, res){

    var Currency = require('../models/currency');
    
    Currency.find({}, function(err, result) {
        if (err) throw err;
      
        res.render('computer',{message:'Controller',
        Currency:result});
      });

/*
    //for find dollar number
    Currency.findOne({'name':'dollar'}, function (err, result) {
        if (err) {
        console.log(err)
        }
 
        res.render('computer',{message:'Controller dollar',
        Currency:result});
    });
*/
}

module.exports.computer = function(req, res){
    res.sendfile(path.join(__dirname, '../../login.html'));
}