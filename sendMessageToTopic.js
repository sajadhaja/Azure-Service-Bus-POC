var http = require('http');
var azure = require('azure');

 
//var connString="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=<key-name>;SharedAccessKey=<key>"
var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
var serviceBusService = azure.createServiceBusService(connString);
var topic ="TestTopicNeudesicDemo";
var message = {
    body: '',
    customProperties: {
        messagenumber: 0
    }
}

for (i = 0;i < 5;i++) {
    message.customProperties.messagenumber=i;
    message.body='This is Message #'+i;
    serviceBusService.sendTopicMessage(topic, message, function(error) {
      if (error) {
        console.log(error);
      }
    });
}