var http = require('http');
var azure = require('azure');


//var connString="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=<key-name>;SharedAccessKey=<key>"
var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
var serviceBusService = azure.createServiceBusService(connString);

serviceBusService.createSubscription('TestTopicNeudesicDemo','AllMessages',function(error){
    if(!error){
       console.log("Subscription created");
    }
});