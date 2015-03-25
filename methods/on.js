module.exports = function(client) {
  
  var events = require('events');
  client.emitter = new events.EventEmitter();
  
  client.es.onmessage = function(message) {
    
    var data = JSON.parse(message.data);
    var eventID = data.event_id;
    var xmlns = Object.keys(data.event)[0];
    
    var eventName = xmlns.split(':').pop();
    client.emitter.emit(eventName, data.event[xmlns], eventID);
    
  }
  
  return function(event, onReady) {
    client.emitter.on(event, onReady);
  }

}