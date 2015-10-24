var fs = require('fs');
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
clockwork.sendSms({To:configuration.TEST_PHONE_NUMBER,Content:'SPAM'}, function(error, response) {
    if (error) {
        console.log('Error', error);
    } else {
        console.log('resp==',response);
        console.log('a',response.SMS_Resp);
        console.log('a',response.SMS_Resp.To);
        console.log('a',response.SMS_Resp.MessageID);
    }
});
