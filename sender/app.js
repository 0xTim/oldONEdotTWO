// Imports
var fs = require('fs');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

// Defaults
var math = require('mathjs');
var configFile = 'config.json';

// Load config
console.log("Loading configuration file(s)");
var configuration = JSON.parse(
    fs.readFileSync(configFile)
);
console.log("...done");
console.log("CONFIGURATION LOADED, use configuration.<key>");
console.log(configuration);


// Configure clockwork
console.log("Configuring clockwork SMS");
var clockwork = require('clockwork')({key:configuration.API_KEY});
console.log("... done");

// Test message
clockwork.sendSms({To:configuration.TEST_PHONE_NUMBERS[math.randomInt(3)],Content:'SPAM', From:'MiddleMan'}, function(error, response) {
    if (error) {
        console.log("Error, couldn't send");
        console.log('Error', error);
    } else {
        console.log("SMS Sent");
    }
});

// Connect to the db and submit change
MongoClient.connect("mongodb://onedottwo:maIts5yUb5Thac@ds031531.mongolab.com:31531/middleman", function(err, db) {
    if(!err) {
        console.log("We are connected");
        var collection = db.collection('messages');
        var doc1 = {'to':configuration.TEST_PHONE_NUMBER, 'from':'system', 'message':'SPAM'};
        collection.insert(doc1, {w:1}, function(err, result) {
            if(err) {
                console.log("Couldn't send to database");
            } else {
                console.log("Sent to database");
            }
        });
    } else {
        console.log("ERROR: Couldn't connect to remote mongo");
    }
});
