// Imports
var fs = require('fs');
var http = require('http');
var MongoClient = require('mongodb').MongoClient;

// Defaults
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

// Connect to the db and send
MongoClient.connect("mongodb://onedottwo:maIts5yUb5Thac@ds031531.mongolab.com:31531/middleman", function(err, db) {
    if(!err) {
        console.log("We are connected");
        var collection = db.collection('messages');
        var doc1 = {'to':'447749638453', 'from':'7749638455', 'message':"RAWR"};
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

// Test message
clockwork.sendSms({To:configuration.TEST_PHONE_NUMBER,Content:'SPAM'}, function(error, response) {
    if (error) {
        console.log("Error, couldn't send");
        console.log('Error', error);
    } else {
        console.log("SMS Sent");
    }
});