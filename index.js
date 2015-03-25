var conf = require('./conf/config.js'),
    request = require('request'),
    EventSource = require('eventsource'),
    fs = require('fs');
    
var btoa = function(str) {
  return new Buffer(str).toString('base64');
}

var initializer = function(apiKey, apiSecret) {
  
  var client = this;
  
  client.es = new EventSource(conf['api-endpoint'] + '/' + conf['api-version'] + '/events', {
    headers: {
      'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret)
    }
  });
  
  client.es.onmessage = function(e) {
    // console.log(e);
  }
  
  client.es.onerror = function(e) {
    // TigerConnect SSE socket times out every 7 minutes
    // ignore error events resulting from the timeout
    if (e.status) {
      console.error('TigerConnect SSE Error:');
      console.error(e);
    }
  }
  
  // load all the 'public' methods
  var normalizedPath = require('path').join(__dirname, 'methods');
  fs.readdirSync(normalizedPath).forEach(function(file) {
    client[file.split('.')[0]] = require('./methods/' + file)(client);
  });
  
  return client;
  
}

module.exports = initializer;