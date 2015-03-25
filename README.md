# tigertext-node
A library for using TigerText via TigerConnect APIs

#### Getting Started
tigertext-node is available as an npm package. Install the latest version with:
```
npm install tigertext
```

Use your TigerConnect API credentials to instantiate a new session and listen for events:

```javascript
var TigerText = require('tigertext')('Ns0XjKlD5PDpA2XTh8SEKJf0K0ZwnPyd', 'KkpNLfno2XoqSQ5J6POALIeZn7AClc5vOEsQ1GUPl2nl0Z7s');

// listen for messages
TigerText.on('message', function(message, eventID) {
  console.log('We got a new message!');
  console.log(message);
  
  // acknowledge the message so it doesn't come back in subsequent replays
  TigerText.ack([eventID], function(err) {
    if (err) {console.log('Error: ' + err)};
  });
}
```

You can listen for all the event types documented here:

https://developer.tigertext.com/docs/rest-api-reference#receiving-events

Just ignore the "tigertext:iq:" part of the event name when attaching listeners.

#### Sending a Message

Sending a message is easy.  The message object supports all the properties documented here:

https://developer.tigertext.com/docs/rest-api-reference#sending-a-message

```javascript
TigerText.sendMessage({
  body: 'Hello World!',
  recipient: 'e9fe5f3a-f7cf-4278-8aca-0b558b5c90ad'
}, function(err, messageID) {
  if (err) {
    console.log(err);
  } else {
    console.log('Success! Here is the message ID:');
    console.log(messageID);
  }
});
```
