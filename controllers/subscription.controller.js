
var express = require('express');
var router = express.Router();
var azure = require('azure');

router.get('/createSubscription', createSubscription);
router.get('/addFilterSubscription', addFilterSubscription);
router.get('/deleteSubscription', deleteSubscription);
router.get('/pullMessageFromSubscription', pullMessageFromSubscription);
//router.get('/pullAllMessageFromSubscription', pullAllMessageFromSubscription);

module.exports = router;

function createSubscription(req, res) {
    const topicname = req.body.topicname || req.param('topicname');
    const subscriptionname = req.body.subscriptionname || req.param('subscriptionname');
    const connectionString = req.body.connectionString || req.param('connectionString');
    if (topicname && connectionString && subscriptionname) {
        //var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
        var serviceBusService = azure.createServiceBusService(connectionString);

        serviceBusService.createSubscription(topicname,subscriptionname,function(error){
            if(!error){
                res.send("Subscription created succesfully, Topic name:"+ topicname+" Subscription name:" + subscriptionname);
            }else {
                res.status(400).send('Failed to create Subscription, reason =>'+ error);
            }
        });

    } else {
        // authentication failed
        res.status(400).send('Enter topic name, subscription name and connection string');
    }
}

function addFilterSubscription(req, res) {
    //console.log("UserName is:"+JSON.parse(JSON.stringify(req.body)));
    const userName = req.body.username || req.param('username');
    const password = req.body.password || req.param('password');
}

function deleteSubscription(req, res) {
    const topicname = req.body.topicname || req.param('topicname');
    const subscriptionname = req.body.subscriptionname || req.param('subscriptionname');
    const connectionString = req.body.connectionString || req.param('connectionString');
    if (topicname && connectionString && subscriptionname) {
        //var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
        var serviceBusService = azure.createServiceBusService(connectionString);

        serviceBusService.deleteSubscription(topicname,subscriptionname, function (error) {
            if(!error){
                res.send("Subscription deleted succesfully, Topic name:"+ topicname+" Subscription name:" + subscriptionname);
            }else {
                res.status(400).send('Failed to deleted Subscription, reason =>'+ error);
            }
        });
    } else {
        // authentication failed
        res.status(400).send('Enter topic name, subscription name and connection string');
    }
}

function pullMessageFromSubscription(req, res){
    const topicname = req.body.topicname || req.param('topicname');
    const subscriptionname = req.body.subscriptionname || req.param('subscriptionname');
    const connectionString = req.body.connectionString || req.param('connectionString');

    if (topicname && connectionString && subscriptionname) {
        //var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
        var serviceBusService = azure.createServiceBusService(connectionString);
        serviceBusService.receiveSubscriptionMessage(topicname, subscriptionname, function(error, receivedMessage){
            if(!error){
                // Message received and deleted
                res.send(receivedMessage);
            }else {
                res.status(400).send('Failed to pull message, reason=> '+ error);
            }
        });        
    } else {
        // authentication failed
        res.status(400).send('Enter topic name, subscription name and connection string');
    }
}

/*function pullAllMessageFromSubscription(req, res){
    const topicname = req.body.topicname || req.param('topicname');
    const subscriptionname = req.body.subscriptionname || req.param('subscriptionname');
    const connectionString = req.body.connectionString || req.param('connectionString');

    if (topicname && connectionString && subscriptionname) {
        //var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
        var serviceBusService = azure.createServiceBusService(connectionString);
        var output = {message:[], status:""};
        var outputMsg = [];
        outputMsg = pullMessage(outputMsg, serviceBusService,topicname, subscriptionname);
        if(outputMsg){
            output.status="Succesfully pull all messages";
            output.message = outputMsg;
            res.send(output);
        }else {
            output.status = 'There is no message to read';
            res.status(400).send(output);
        }
    } else {
        // authentication failed
        res.status(400).send('Enter topic name, subscription name and connection string');
    }
}

function pullMessage(outputMsg, serviceBusService,topicname, subscriptionname){
    serviceBusService.receiveSubscriptionMessage(topicname, subscriptionname, function(error, receivedMessage){
        if(!error){
            // Message received and deleted
            outputMsg.push(receivedMessage);
            pullMessage(outputMsg, serviceBusService,topicname, subscriptionname);
        }else {
            return outputMsg;
        }
    }); 
}*/