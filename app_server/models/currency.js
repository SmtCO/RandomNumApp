var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var currencySchema = new Schema({
    name: {type:String, required:true, unique:true},
    currencyNum: Number
}, {collection:'currencys'});

var Currency = mongoose.model('Currency', currencySchema);

module.exports = Currency;