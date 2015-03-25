var EventSource = require('eventsource'),
    fs = require('fs');

var initializer = function(apiKey, apiSecret) {
  
  var client = this;
  
  client.conf = require('./conf/config.js');
  client.apiKey = apiKey;
  client.apiSecret = apiSecret;
  
  client.btoa = function(str) {
    return new Buffer(str).toString('base64');
  }
  
  client.es = new EventSource(client.conf['api-endpoint'] + '/' + client.conf['api-version'] + '/events', {
    headers: {
      'Authorization': 'Basic ' + client.btoa(client.apiKey + ':' + client.apiSecret)
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