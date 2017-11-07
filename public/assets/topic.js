function createTopic(){    
    $.ajax({
        url: "/topic/createTopic",
        data: {
            topicname: $("#topicName").val(),
            connectionString:$("#connectionString").val(),
            timeToLive:$("#timeToLive").val(),
            maxSizeInMB:$("#maxSizeInMB").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        alert(json);
        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      });
}

function deleteTopic(){    
    $.ajax({
        url: "/topic/deleteTopic",
        data: {
            topicname: $("#topicName").val(),
            connectionString:$("#connectionString").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        alert(json);        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      });
}

function createSubscription(){    
    $.ajax({
        url: "/subscription/createSubscription",
        data: {
            topicname: $("#topicName").val(),
            subscriptionname:$("#subscriptionName").val(),
            connectionString:$("#connectionString").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        alert(json);
        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }); 
}

function deleteSubscription(){    
    $.ajax({
        url: "/subscription/deleteSubscription",
        data: {
            topicname: $("#topicName").val(),
            subscriptionname:$("#subscriptionName").val(),
            connectionString:$("#connectionString").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        alert(json);
        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      }); 
}


function sendMessageToTopic(){    
    $.ajax({
        url: "/topic/sendMessageToTopic",
        data: {
            topicname: $("#topicName").val(),
            connectionString:$("#connectionString").val(),
            noOfMessageTosent:$("#noOfMessageTosent").val(),
            messageUI:$("#messageUI").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        alert(json);        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      });
}

function pullMessageFromSubscription(){    
    $.ajax({
        url: "/subscription/pullMessageFromSubscription",
        data: {
            topicname: $("#topicName").val(),
            connectionString:$("#connectionString").val(),
            subscriptionname:$("#subscriptionName").val()
        },
        type: "GET",
        dataType : "json",
    }).done(function( json ) {
        alert(json.body);        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      });
}
function pullAllMessageFromSubscription(){    
    $.ajax({
        url: "/subscription/pullAllMessageFromSubscription",
        data: {
            topicname: $("#topicName").val(),
            connectionString:$("#connectionString").val(),
            subscriptionname:$("#subscriptionName").val()
        },
        type: "GET",
        dataType : "text",
    }).done(function( json ) {
        console.log(json);
        alert(json);        
      })         
      .fail(function( xhr, status, errorThrown ) {
        alert(xhr.responseText);
        console.log( "Error: " + errorThrown );
        console.log( "Status: " + status );
        console.dir( xhr );
      });
}