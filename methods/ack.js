module.exports = function(client) {
  
  return function(ids, onReady) {
    
    if (typeof ids === 'string') {ids = [ids]};
    var uri = client.conf['api-endpoint'] + '/' + client.conf['api-version'] + '/events/ack';
    
    require('request')({
      uri: uri,
      method: 'POST',
      json: {events: ids},
      headers: {
        'Authorization': 'Basic ' + client.btoa(client.apiKey + ':' + client.apiSecret)
      }
    }, function(err, resp, body) {
      if (err) {
        onReady(err);
      } else if (resp.statusCode !== 204) {
        onReady({
          error: {status: resp.statusCode}
        });
      } else {
        onReady(null);
      }
    });
    
  }
  
}