var request = require('request');
var async = require('async');

/**
 * Adds a new agent to a knowhow server.  If no login or password is specified it will attempt to scan for an already
 * running agent on the specified host.  If no port is specified the port 3141 is used.  Plain text passwords may be used, but 
 * is discouraged.  Use passowrddEnc to pass encrypted passwords that are descryped using the server's encrytion key
 * 
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo only host is requred - ex: \{"host": "myHost", "port": 3141, "user": "MyUSer", "passwordEnc": "DSAF@#R##EASDSAS@#"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var addAgent = function(serverURL, agentInfo, callback) {
	 
	 request({ method: 'POST'
	    , uri: serverURL+'/api/addAgent'
	    , body: agentInfo
	    , json: true
    }, function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	var khEventHandler = new require('../kh-api/kh-events-handler')(serverURL);
	        	khEventHandler.on('agent-add', function(agent) {
	        		console.log('agent-add');
	        		if(agent.user==agentInfo.user && agent.host==agentInfo.host && agent.port==agentInfo.port) {
	        			khEventHandler.removeAllListeners();
	        			callback(undefined, agent);
	        		}
	        	});
	        	khEventHandler.on('agent-error', function(agent) {
	        		console.log('agent-error');
	        		if(agent.user==agentInfo.user && agent.host==agentInfo.host && agent.port==agentInfo.port) {
	        		 	khEventHandler.removeAllListeners();
	        			callback(new Error(agent.message));
	        		}
	        	});
	        	
	        }
	    }
	);

};

/**
 * Synchronous version of addAgent call
 *
 * @param serverURL the knowhow server URL
 * @param agentInfo json representaion of the agent to add
 */
var addAgentSync = function(serverURL, agentInfo) {
	async.series([
	    function(callback){
	        addAgent(serverURL, agentInfo, callback)
	    }
		],
	
		function(err,agent) {
			if (err) {
				return undefined;
			}
			else return agent;
	});
}

/**
 * Updates agent info with values specified in agentInfo
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234:", "host": "myHost", "port": 3141, "user": "MyUser", "passwordEnc": "DSAF@#R##EASDSAS@#"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var updateAgent = function(serverURL, agentInfo, callback) {
	 request.post(serverURL+'/api/agentEvent',{form:  agentInfo},
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	callback();
	        }
	    }
	);
}

/**
 * deletes an agent on a knowhow server
 * 
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var deleteAgent = function(serverURL, agentInfo, callback) {
	    
	 request.post(serverURL+'/api/deleteAgent',{form:  agentInfo},
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	var khEventHandler = new require('../kh-api/kh-events-handler')(serverURL);
	        	khEventHandler.on('agent-delete', function(agent) {
	        		console.log('agent-delete');
	        		if(agent.user==agentInfo.user && agent.host==agentInfo.host && agent.port==agentInfo.port) {
	        			khEventHandler.removeAllListeners();
	        			callback(undefined, agent);
	        		}
	        	});
	        	khEventHandler.on('agent-error', function(agent) {
	        		console.log('agent-error');
	        		if(agent.user==agentInfo.user && agent.host==agentInfo.host && agent.port==agentInfo.port) {
	        			khEventHandler.removeAllListeners();
	        			callback(new Error(agent.message));
	        		}
	        	});
	        }
	    }
	);

};


/**
 * deletes an agent on a knowhow server
 * 
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234"\}
 * @return agent or undefined if it didn't work
 */
deleteAgentSync = function(serverURL, agentInfo) {
	async.series([
	    function(callback){
	        deleteAgent(serverURL, agentInfo, callback)
	    }
		],
	
		function(err,agent) {
			if (err) {
				return undefined;
			}
			else return agent;
		}
	);
}

/**
 * retrives agent info base on _id.
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo must specify _id - ex: _id: "1234"
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentInfo = function(serverURL, agentInfo, callback) {

};

/**
 * retrives agent info base on _id.
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agentInfo - agentInfo must specify _id - ex: 1234
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentLogs = function(serverURL, agentInfo, callback) {
	request.post(serverURL+'/api/logs',agentInfo,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	callback();
	        }
	    }
	);
}

/**
 * retrieves a list of all agents on a knowhow server
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentList = function(serverURL, callback) {
	request.get(serverURL+'/api/connectedAgents' ,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	           if (!error) {
	    			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
		        var jsonObject = JSON.parse(body);
	        	if (jsonObject == undefined) {
	        	  	jsonObject = {};
	        	}
		        callback(undefined, jsonObject);
		    }
	    }
	);
}

exports.addAgent = addAgent;
exports.addAgentSync = addAgentSync;
exports.deleteAgent = deleteAgent;
exports.deleteAgentSync = deleteAgentSync;
exports.updateAgent = updateAgent;
exports.getAgentLogs = getAgentLogs;
exports.getAgentList = getAgentList;