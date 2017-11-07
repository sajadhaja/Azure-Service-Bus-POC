var http = require('http');
var azure = require('azure');


//var connString="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=<key-name>;SharedAccessKey=<key>"
var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
var serviceBusService = azure.createServiceBusService(connString);
var topic ="testtopic";
var subscription = "testsub";

//Without locking mechanism
serviceBusService.receiveSubscriptionMessage(topic, subscription, function(error, receivedMessage){
    if(!error){
        // Message received and deleted
        console.log("ddd"+receivedMessage);
    }else {
        console.error("error"+error);
    }
});

//With locking mechanism
serviceBusService.receiveSubscriptionMessage(topic, subscription, { isPeekLock: true }, function(error, lockedMessage){
    if(!error){
        // Message received and locked
        console.log(lockedMessage);
        serviceBusService.deleteMessage(lockedMessage, function (deleteError){
            if(!deleteError){
                // Message deleted
                console.log('message has been deleted.');
            }
        })
    }
});