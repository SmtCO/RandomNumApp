//Samet Cengiz ÖZCAN
//sametc.ozcan

// Load express
var express = require('express');
var path = require('path');
var app = express();

// For db connect
require('./app_server/models/db');

// load views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app_server/views'));

// Use route and public
var routeApplication = require('./app_server/routes/ApplicationRoute');
// Set public folder
app.use(express.static(path.join(__dirname, 'view')));

app.use('/application', routeApplication);
app.use('/', routeApplication);


// Load module
var Currency = require('./app_server/models/currency');

// initialize numbers (Saves)
const initialDollar=5;
const initialEuro=6;
const initialGold=204;
// Saves
var dollar = new Currency({name: 'dollar', currencyNum: initialDollar});
dollar.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved dollar");
}});
var euro = new Currency({name: 'euro', currencyNum: initialEuro});
euro.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved euro");
}});
var gold = new Currency({name: 'gold', currencyNum: initialGold});
gold.save(function(err) {
    if (err){console.log("record available dollar or"+err);
    }else {console.log("saved gold");
}});

// For update all variable
const querydollar = { name: 'dollar'};
const querygold = { name: 'gold' };
const queryeuro = { name: 'euro' };
const options = { new: true };

// Database is updated every 2 seconds
// For update dollar
setInterval(function(){
    var dollarRandomnumber = Math.floor((Math.random()*100)+1); 
    const update  = { currencyNum: dollarRandomnumber };
    console.log('dollar random: '+dollarRandomnumber);
    
    Currency.findOneAndUpdate(querydollar, update, options, function(){
        console.log('dollar document updated');
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

// for update gold
setInterval(function(){
    var goldRandomnumber = Math.floor((Math.random()*100)+1); 
    const update  = { currencyNum: goldRandomnumber };
    console.log('gold random: '+goldRandomnumber);
    
    Currency.findOneAndUpdate(querygold, update, options, function(){ 
        console.log('gold document updated');
    });
}, 2000);

const port = 8000;

var server = app.listen(port, () => console.log(`Server started on port ${port}`));

var io = require('socket.io')(8080);

// Soccet connection 
io.on('connection', function (socket) {
    console.log('new connection');
    dollar = initialDollar;
    euro = initialEuro;
    gold = initialGold;

    // Dollar find new value
    setInterval(function () {
        Currency.find(function (err, result) {
            if (err) throw err;
            dollar= result[0].currencyNum;
            console.log('dollar find new value ---------:  ', dollar);
        });
        socket.emit('update-valueDollar', dollar);
    }, 5000);

    // Euro find new value
    setInterval(function () {
        Currency.find(function (err, result) {
            if (err) throw err;
            euro = result[1].currencyNum
            console.log('euro find new value ---------:  ', euro);
        });
        socket.emit('update-valueEuro', euro);
    }, 5000);

    // Gold find new value
    setInterval(function () {
        Currency.find(function (err, result) {
            if (err) throw err;
            gold = result[2].currencyNum
            console.log('gold find new value ---------:  ', gold);
        });
        socket.emit('update-valueGold', gold);
    }, 5000);

});

var io = require("socket.io").listen(server);