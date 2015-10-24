// Imports
var fs = require('fs');
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
var sms_to = configuration.TEST_PHONE_NUMBERS[math.randomInt(3)];
var sms_content = "MATT SPAMS ALL";
var sms_from = "MiddleMan";
clockwork.sendSms({To:sms_to,Content:sms_content, From:sms_from}, function(error, response) {
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
        var collection = db.collection('messages');
        var document = {'to':sms_to, 'from':sms_from, 'message':sms_content};
        collection.insert(document, {w:1}, function(err, result) {
            if(err) {
                console.log("Couldn't send to database");
            }
        });
    } else {
        console.log("ERROR: Couldn't connect to remote mongo");
    }
});