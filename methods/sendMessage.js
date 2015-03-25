module.exports = function(client) {
  
  return function(messageDetails, onReady) {
    
    var uri = client.conf['api-endpoint'] + '/' + client.conf['api-version'] + '/message';
    
    require('request')({
      uri: uri,
      method: 'POST',
      json: messageDetails,
      headers: {
        'Authorization': 'Basic ' + client.btoa(client.apiKey + ':' + client.apiSecret)
      }
    }, function(err, resp, body) {
      if (err) {
        onReady(err);
      } else if (resp.statusCode !== 204) {
        if (body) {
          onReady(body);
        } else {
          onReady({
            error: {status: resp.statusCode}
          });
        }
      } else {
        onReady(null, resp.headers['tt-x-message-id']);
      }
    });
    
  }
  
}