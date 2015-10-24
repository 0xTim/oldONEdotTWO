var fs = require('fs');
var configFile = 'config.json';

// Load config
var configuration = JSON.parse(
    fs.readFileSync(configFile)
);

console.log("CONFIGURATION LOADED, use configuration.<key>");
console.log(configuration);
