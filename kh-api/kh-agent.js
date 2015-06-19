var request = require('request');
var async = require('async');

var agentDeleteQueue = {};
var agentAddQueue = {};



function validateAgent(agentInfo) {
	console.log(agentInfo);
	if (agentInfo.login && !agentInfo.user) {
		agentInfo.user = agentInfo.login;
	}
	return (agentInfo.user && agentInfo.host && agentInfo.port);
}

/**
 * Adds a new agent to a knowhow server.  If no login or password is specified it will attempt to scan for an already
 * running agent on the specified host.  If no port is specified the port 3141 is used.  Plain text passwords may be used, but 
 * is discouraged.  Use passowrddEnc to pass encrypted passwords that are descryped using the server's encrytion key
 * 
 * @param agentInfo - agentInfo only host is requred - ex: \{"host": "myHost", "port": 3141, "user": "MyUSer", "passwordEnc": "DSAF@#R##EASDSAS@#"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var addAgent = function(agentInfo, callback) {
	if (!validateAgent(agentInfo)) {
		callback(new Error("Invalid agent data"));
		return;
	}
	 var id = agentInfo.user+"@"+agentInfo.host+":"+agentInfo.port;
	 agentAddQueue[id] = callback;
	 request({ method: 'POST'
	    , uri: this.serverURL+'/api/addAgent'
	    , body: agentInfo
	    , json: true
    }, function (error, response, body) {
	        if (error || (response && response.statusCode != 200)) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body.message)); 
	        	} else {
	            	callback(error);
	            }
	            delete agentAddQueue[id];
	        } else {
		        //callback(undefined, body);
	        	
	        }
	    }
	);

};

/**
 * Synchronous version of addAgent call
 *
 * @param agentInfo json representaion of the agent to add
 */
var addAgentSync = function(agentInfo) {
	async.series([
	    function(callback){
	        addAgent.bind({serverURL: this.serverURL})(agentInfo, callback);
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
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234:", "host": "myHost", "port": 3141, "user": "MyUser", "passwordEnc": "DSAF@#R##EASDSAS@#"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var updateAgent = function(agentInfo, callback) {
	 request.post(this.serverURL+'/api/agentEvent',{form:  agentInfo},
	    function (error, response, body) {
	        if (error || (response && response.statusCode != 200)) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	if (callback) callback();
	        }
	    }
	);
}

/**
 * deletes an agent on a knowhow server
 * 
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var deleteAgent = function(agentInfo, callback) {
	 //var id = agentInfo.user+"@"+agentInfo.host+":"+agentInfo.port;
	 //agentDeleteQueue[id] = callback;
	 console.log(agentInfo);
	 request.post(this.serverURL+'/api/deleteAgent',{form: agentInfo},
	    function (error, response, body) {
	    	if (response) {
	    		console.log("got delete response: "+response.statusCode);
	    	}
	        if (error || (response && response.statusCode != 200)) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body.message)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	      		callback();
	        }
	    }
	);

};


/**
 * deletes an agent on a knowhow server
 * 
 * @param agentInfo - agentInfo must specify _id - ex: \{"_id": "1234"\}
 * @returns agent or undefined if it didn't work
 */
deleteAgentSync = function(agentInfo) {
	async.series([
	    function(callback){
	        deleteAgent.bind({serverURL: this.serverURL})(agentInfo, callback);
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
 * resets an agent on a knowhow server by stopping and restarting. 
 * 
 * @param agentInfo - agentInfo only host is requred - ex: \{"host": "myHost", "port": 3141, "user": "MyUSer", "passwordEnc": "DSAF@#R##EASDSAS@#"\}
 * @param callback - callback function with parameters (error, agentInfo)
 */
var resetAgent = function(agentInfo, callback) {
	if (!validateAgent(agentInfo)) {
		callback(new Error("Invalid agent data"));
		return;
	}
	 var id = agentInfo.user+"@"+agentInfo.host+":"+agentInfo.port;
	 agentAddQueue[id] = callback;
	 request({ method: 'POST'
	    , uri: this.serverURL+'/api/resetAgent'
	    , body: agentInfo
	    , json: true
    }, function (error, response, body) {
	        if (error || (response && response.statusCode != 200)) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body.message)); 
	        	} else {
	            	callback(error);
	            }
	            delete agentAddQueue[id];
	        } else {
		        //callback(undefined, body);
	        	
	        }
	    }
	);

};

/**
 * Synchronous version of addAgent call
 *
 * @param agentInfo json representaion of the agent to add
 */
var resetAgentSync = function(agentInfo) {
	async.series([
	    function(callback){
	        resetAgent.bind({serverURL: this.serverURL})(agentInfo, callback);
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
 * retrives agent info base on _id.
 *
 * @param agentInfo - agentInfo must specify _id - ex: _id: "1234"
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentInfo = function(agentInfo, callback) {
	request.post(this.serverURL+'/api/getAgentInfo',agentInfo,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	callback(undefined, JSON.parse(body));
	        }
	    }
	);
};

/**
 * retrives agent info base on _id.
 *
 * @param agentInfo - agentInfo must specify _id - ex: 1234
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentLogs = function(agentInfo, callback) {
	request.post(this.serverURL+'/api/logs',agentInfo,
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
 * @param callback - callback function with parameters (error, agentInfo)
 */
var getAgentList = function(callback) {
	request.get(this.serverURL+'/api/connectedAgents' ,
	    function (error, response, body) {
	        if (error || (response && response.statusCode != 200)) {
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

/**
 * Checks if an agent is alive by attempting to contact it through the server.
 *
 * @param agent - agent json
 * @param callback
 *
 * @returns \{alive: true\} if the agent can be reached.
 */
var agentHeartbeat = function(agent, callback) {

	var data = {
	    	agent: agent,
	    };
	request.post(this.serverURL+'/api/agentHeartbeat',{form: data},
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
 * Waits for an agent to start up and returns when done.  Used for flow control in scripts.
 *
 * @param agent - agent json
 * @param callback
 *
 * @returns \{alive: true\} if the agent can be reached.
 */
var waitForAgentStartup = function(agent, callback) {

	var data = {
	    	agent: agent,
	    };
	request.post(this.serverURL+'/api/waitForAgentStartup',{form: data},
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

function KHAgent(serverURL,khEventHandler) {
	var self = this;
	self.serverURL = serverURL;
	self.khEventHandler = khEventHandler;
	
	self.khEventHandler.on('agent-add', function(agent) {
		var id = agent.user+"@"+agent.host+":"+agent.port;
		console.log('agent add complete: '+id);
		console.log(agentAddQueue);
		console.log(agentAddQueue[id]);
		if (agentAddQueue[id]) {
			agentAddQueue[id](undefined, agent);
			delete agentAddQueue[id];
		}
	});
	self.khEventHandler.on('agent-error', function(agent) {
		var id = agent.user+"@"+agent.host+":"+agent.port;
		var errorMessage = "agent error: "+id;
		if (agent.message) {
			errorMessage = errorMessage+" "+agent.message;
		}
		console.log(errorMessage);
		if (agentAddQueue[id]) {
			agentAddQueue[id](new Error(errorMessage));
			delete agentAddQueue[id];
		}

	});
	self.khEventHandler.on('agent-delete', function(agent) {
		var id = agent.user+"@"+agent.host+":"+agent.port;
		console.log('agent delete complete '+id);
		//if (agentDeleteQueue[id]) {
		//	agentDeleteQueue[id](new Error(agent.message));
		//	delete agentDeleteQueue[id];
		//}
	});
	
	self.addAgent = addAgent.bind({serverURL: serverURL});
	self.addAgentSync = addAgentSync.bind({serverURL: serverURL});
	self.deleteAgent = deleteAgent.bind({serverURL: serverURL});
	self.deleteAgentSync = deleteAgentSync.bind({serverURL: serverURL});
	self.resetAgent = resetAgent.bind({serverURL: serverURL});
	self.resetAgentSync = resetAgentSync.bind({serverURL: serverURL});
	self.updateAgent = updateAgent.bind({serverURL: serverURL});
	self.getAgentLogs = getAgentLogs.bind({serverURL: serverURL});
	self.getAgentList = getAgentList.bind({serverURL: serverURL});
	self.getAgentInfo = getAgentInfo.bind({serverURL: serverURL});
	self.agentHeartbeat = agentHeartbeat.bind({serverURL: serverURL});
	self.waitForAgentStartup = waitForAgentStartup.bind({serverURL: serverURL});
	return self;
}

module.exports = KHAgent;
KHAgent.prototype.addAgent = addAgent;
KHAgent.prototype.addAgentSync = addAgentSync;
KHAgent.prototype.deleteAgent = deleteAgent;
KHAgent.prototype.deleteAgentSync = deleteAgentSync;
KHAgent.prototype.resetAgent = resetAgent;
KHAgent.prototype.resetAgentSync = resetAgentSync;
KHAgent.prototype.updateAgent = updateAgent;
KHAgent.prototype.getAgentInfo = getAgentInfo;
KHAgent.prototype.agentHeartbeat = agentHeartbeat;
KHAgent.prototype.waitForAgentStartup = waitForAgentStartup;

/*
exports.addAgent = addAgent;
exports.addAgentSync = addAgentSync;
exports.deleteAgent = deleteAgent;
exports.deleteAgentSync = deleteAgentSync;
exports.updateAgent = updateAgent;
exports.getAgentLogs = getAgentLogs;
exports.getAgentList = getAgentList;*/