
var express = require('express');
var router = express.Router();
var azure = require('azure');

router.get('/createTopic', createTopic);
router.get('/deleteTopic', deleteTopic);
router.get('/sendMessageToTopic', sendMessageToTopic);
router.get('/addFilterTopic', addFilterTopic);


module.exports = router;

function createTopic(req, res) {
    const topicname = req.body.topicname || req.param('topicname');
    const connectionString = req.body.connectionString || req.param('connectionString');
    const timeToLive = req.param('timeToLive');
    const maxSizeInMB = req.param('maxSizeInMB');
    if (topicname && connectionString) {
        //var connString ="Endpoint=sb://testservicebusneu.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=365u7ACwz0IByTvZKgB9b7fIIX3o0cAZKyexg49mfmA="
        var serviceBusService = azure.createServiceBusService(connectionString);
        var topicOptions = {
            MaxSizeInMegabytes: maxSizeInMB,
            DefaultMessageTimeToLive: 'PT'+timeToLive+'M',

        };

        serviceBusService.createTopicIfNotExists(topicname, topicOptions, function (error) {
            if (!error) {
                res.send("Topic created succesfully, topic name:" + topicname);
            } else {
                res.status(400).send('Failed to create topic, reason =>'+ error);
            }
        });

    } else {
        // authentication failed
        res.status(400).send('Enter topic name and connection string');
    }
}

function deleteTopic(req, res) {
    const topicname = req.body.topicname || req.param('topicname');
    const connectionString = req.body.connectionString || req.param('connectionString');
    if (topicname && connectionString) {
        var serviceBusService = azure.createServiceBusService(connectionString);
        serviceBusService.deleteTopic(topicname, function (error) {
            if (!error) {
                res.send("Topic deleted succesfully, topic name:" + topicname);
            }else {
                res.status(400).send('Failed to delete topic, reason=> '+ error);
            }
        });
    } else {
        // authentication failed
        res.status(400).send('Enter topic name and connection string');
    }
}

function sendMessageToTopic(req, res){
    const topicname = req.body.topicname || req.param('topicname');
    const connectionString = req.body.connectionString || req.param('connectionString');
    const noOfMessageTosent = req.body.noOfMessageTosent || req.param('noOfMessageTosent') || 1;
    const messageUI = req.body.messageUI || req.param('messageUI');
    if (topicname && connectionString && messageUI) {
        var serviceBusService = azure.createServiceBusService(connectionString);
        var message = {body: '', customProperties: {messagenumber: 0}};
        var errorMsg = "";
        var hasError = false;
        for (i = 0;i < noOfMessageTosent;i++) {
            message.customProperties.messagenumber=i;
            message.body=messageUI+i;
            serviceBusService.sendTopicMessage(topicname, message, function(error) {
              if (error) {
                errorMsg+=error;
                hasError = true;
              }
            });
        }
        if (!hasError) {
            res.send("Message sent succesfully, topic name:" + topicname);
        }else {
            res.status(400).send('Failed to send message, reason=> '+ errorMsg);
        }
    } else {
        // authentication failed
        res.status(400).send('Enter topic name, message and connection string');
    }
}

function addFilterTopic(req, res) {
    //console.log("UserName is:"+JSON.parse(JSON.stringify(req.body)));
    const userName = req.body.username || req.param('username');
    const password = req.body.password || req.param('password');
}