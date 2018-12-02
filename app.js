// load express
var express = require('express');
var path = require('path');
var app = express();
// load db connect
require('./app_server/models/db');
// load views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app_server/views'));

//use route and public
var routeApplication = require('./app_server/routes/ApplicationRoute');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/application', routeApplication);

// load module
var Currency = require('./app_server/models/currency');

// initialize numbers
var dollar = new Currency({name: 'dollar', currencyNum: 6});
dollar.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved dollar");
}});
var euro = new Currency({name: 'euro', currencyNum: 6});
euro.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved euro");
}});
var gold = new Currency({name: 'gold', currencyNum: 204});
gold.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved gold");
}});

// for update all variable
const querydollar = { name: 'dollar'};
const querygold = { name: 'gold' };
const queryeuro = { name: 'euro' };
const options = { new: true };

// for update dollar
setInterval(function(){
    var dollarRandomnumber = Math.floor((Math.random()*100)+1); 
    const update  = { currencyNum: dollarRandomnumber };
    console.log('dollar random: '+dollarRandomnumber);
    
    Currency.findOneAndUpdate(querydollar, update, options, function(){ 
        console.log('dollar document updated');
    });
}, 2000);

// for update gold
setInterval(function(){
    var goldRandomnumber = Math.floor((Math.random()*100)+1); 
    const update  = { currencyNum: goldRandomnumber };
    console.log('gold random: '+goldRandomnumber);
    
    Currency.findOneAndUpdate(querygold, update, options, function(){ 
        console.log('gold document updated');
    });
}, 2000);

// for update euro
setInterval(function(){
    var euroRandomnumber = Math.floor((Math.random()*100)+1); 
    const update  = { currencyNum: euroRandomnumber };
    console.log('euro random: '+euroRandomnumber);
    
    Currency.findOneAndUpdate(queryeuro, update, options, function(){ 
        console.log('euro document updated');
    });
}, 2000);

app.listen(8000);