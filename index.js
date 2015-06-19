var request = require('request');

/**
 * Checks if a server is alive
 *
 * @param serverURL the url of the knowhow server to check.
 */
var serverHeartbeat = function(callback) {

    request.get(this.serverURL+'/api/serverInfo' ,
	    function (error, response, body) {
	    
	        if (error || (response && response.statusCode != 200)) {
	           if (!error) {
	    			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	
		        callback(undefined, {alive: true});
		    }
	    }
	 );

};

var waitForServerStartup = function(callback) {

	
    //timeout after 40 secs
    var timeout = setTimeout(function() {
    	clearInterval(heartbeatCheck);
    	callback(new Error("server did not start"));
    }, 40000);
    
    
    //wait until a heartbeat is received
    var heartbeatCheck = setInterval(function() {
    	var heartbeat2 = serverHeartbeat;
    	//console.log(this.agent);
    	heartbeat2(function (err) {
    		if (!err) {
    			clearTimeout(timeout);
    			clearInterval(heartbeatCheck);
    			callback();
    		} else {
    			console.log(err.message);
    			//callback(new Error("server did not start"));
    		}
    	});
    }.bind({serverURL: this.serverURL, callback: callback}), 500);
};


/**
 * Factory method for a KHClieent
 * This is a programatic representation of a knowhow server.  It provides the same functionality that the knowhow
 * server UI does.
 *
 * @param serverURL - the knwohow server being manipulated
 */
function KHClient(serverURL) {
	var self = this;
	console.log(serverURL);
	self.serverURL = serverURL;
	self.khEventHandler = new require('./kh-api/kh-events-handler')(serverURL);
	self.khRepository = require('./kh-api/kh-repository')(serverURL, self.khEventHandler);
	self.khJob = require('./kh-api/kh-job')(serverURL, self.khEventHandler,self);
	self.khAgent = new require('./kh-api/kh-agent')(serverURL, self.khEventHandler);
	self.khWorkflow = require('./kh-api/kh-workflow')(serverURL, self.khEventHandler,self);
	self.serverHeartbeat = serverHeartbeat.bind({serverURL: serverURL});
	self.waitForServerStartup = waitForServerStartup.bind({serverURL: serverURL});
	
	self.end = function() {
		console.log("ending KH client to: "+serverURL);
		self.khEventHandler.removeAllListeners();
		self.khEventHandler.close();
		self.khEventHandler.disconnect();
	}
	return self;
	
}

module.exports = KHClient;
