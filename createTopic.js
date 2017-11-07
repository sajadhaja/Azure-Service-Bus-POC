var http = require('http');
var azure = require('azure');


//var connString="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=<key-name>;SharedAccessKey=<key>"
var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
var serviceBusService = azure.createServiceBusService(connString);

var topicOptions = {
        MaxSizeInMegabytes: '5120',
        DefaultMessageTimeToLive: 'PT1M'
    };

serviceBusService.createTopicIfNotExists('TestTopicNeudesicDemo', topicOptions, function(error){
    if(!error){
       // Topic was created or exists
        console.log('topic created or exists.');
    }
});


var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
