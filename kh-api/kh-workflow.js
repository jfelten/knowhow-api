var request = require('request');
var async = require('async');

var jobQueue={};
var workflowQueue={};


//workflow api
//app.post('/api/loadAgentsForEnvironment', workflowControl.loadAgentsForEnvironment);
//app.post('/api/initAgents', workflowControl.initAgents);
//app.post('/api/executeWorkflow', workflowControl.executeWorkflow);

function agentToString(agent) {
	return agent.user+'@'+agent.host+':'+agent.port+'('+agent._id+')';
}


/**
 * loads all agents on an environment.  Returns with the agent data fully populated
 *
 * @param environment - the environment to load
 */
var loadAgentsForEnvironment = function(environment, callback) {
	
	var data = {
		environment: environment
	}
	
	request.post(this.serverURL+'/api/loadAgentsForEnvironment', {form: data},
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
}

/**
 * Ensures that all agents for an environment are running.  IF a defined agent does not exist an attempt is made to add it.
 *
 * @param environment - an environment json object
 */
var connectEnvironmentAgents = function(environment, callback) {
	loadAgentsForEnvironment.bind({serverURL: this.serverURL})(environment, function(err, loadedEnvironment) {
		if (err) {
			callback(err);
		} else {
			console.log(loadedEnvironment.agents);
			callback(undefined, environment)
			/*
			async.each(Object.keys(loadedEnvironment.agents), function(agentDesignation,cb) {
				console.log(loadedEnvironment.agents[agentDesignation]);
				this.khClient.khAgent.resetAgent(loadedEnvironment.agents[agentDesignation], cb);
			
			}, function(err) {
			
				if(err) {
					callback(err);
				} else {
					callback(undefined, environment)
				}
			});*/
			
		}
	
	});

}

/**
 * Executes a workflow on a knowhow server
 *
 * @param environment - json environment representation (i.e. collection of knowhow agents that represent the environment)
 * @param workflow - a json workflow to execute
 * @param callback - callback function with parameters (error, agentInfo)
 */
var executeWorkflow = function(environment, workflow, callback) {


	executeOnServer(this.serverURL, environment, workflow, callback);


}

/**
 * Synchronous version of addWorkflow call
 *
 * @param environment json representaion of the workflow's environment
 * @param workflow to run
 */
var executeWorkflowSync = function(environment, workflow) {
	async.series([
	    function(callback){
	        executeWorkflow.bind({serverURL: serverURL})(environment, workflow, callback);
	    }
		],
	
		function(err,job) {
			if (err) {
				return undefined;
			}
			else return job;
	});
}

function agentEquals(agent1,agent2) {
	if (agent1._id && agent2._id && agent1._id==agent2._id) {
		return true;
	}
	if (agent1.host==agent2.host && agent1.user==agent2.user 
		&& agent1.port == agent2.port) {
		return true;	
	}
	return false;
}

var executeOnServer = function(serverURL, environment, workflow, callback) {
	
	 console.log("posting to: "+serverURL+'/api/executeWorkflow using '+environment.id);
	
	if (!workflowQueue[environment._id]) {
		workflowQueue[environment._id] = {};
	}
	workflowQueue[environment._id][workflow.id] = callback;
	console.log(workflowQueue[environment._id]);
	var data = {
	    	environment: environment,
	    	workflow: workflow
	    };
	 //console.log(data);
	 request({ method: 'POST'
	    , uri: serverURL+'/api/executeWorkflow'
	    , body:data
	    , json: true
    }, function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
	            	console.error(body);
        			callback(new Error("response: "+response.statusCode+" "+body.message)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	
	        	
	        }
	    }
	);
}

/**
 * Cancels a running workflow on a knowhow server
 *
 * @param environment - environment to cancel
 * @param workflow - a json workflow to execute
 * @param callback - callback function with parameters (error, agentInfo)
 */
var cancelWorkflow = function(environment, workflow) {
	var data = {
	    	environment: environment,
	    	workflow: workflow
	    };
	 request({ method: 'POST'
	    , uri: this.serverURL+'/api/cancelWorkflow'
	    , body:data
	    , json: true
     }, function (error, response, body) {
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
};

/**
 * Retreives a list of currently executing workflows on a knowhow server
 *
 * @param callback - callback function with parameters (error, runningJobList)
 */ 
var getRunningWorkflowsList = function(callback) {
	request.get(this.serverURL+'/api/runningWorkflowsList' ,
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


/**
 * Factory method for KHWorkflow
 * @param serverURL the url of the server
 * @param khEventHandler EventHandler
 * @param the khJob object for this workflow engine
 * @param khClient
 */
function KHWorkflow(serverURL, khEventHandler, khClient){
	self=this;
	self.serverURL = serverURL;
	self.khEventHandler = khEventHandler;
	self.khClient = khClient;
	self.khJob = khJob;
	self.khEventHandler.on("workflow-complete", function(completedEnvironment, completedJob) {
		console.log(workflowQueue);
		console.log(completedWorkflow.id+" done on environment: "+agentToString(completedEnvironment));
		if (workflowQueue[completedEnvironment._id] && workflowQueue[completedEnvironment._id][completedWorkflow.id]) {
			workflowQueue[completedEnvironment._id][completedWorkflow.id](undefined,completedWorkflow);
			delete workflowQueue[completedEnvironment._id][completedWorkflow.id];
		}
	});
	self.khEventHandler.on("workflow-error", function(errorEnvironment, errorWorkflow) {
		console.log(errorWorkflow.id +"error on "+agentToString(errorEnvironment));
		console.error(errorWorkflow.message);
		if (workflowQueue[errorEnvironment._id] && workflowQueue[errorEnvironment._id][errorWorkflow.id]) {
			workflowQueue[errorEnvironment._id][errorWorkflow.id](new Error(errorWorkflow.id +"job error on "+agentToString(errorEnvironment)));
			delete workflowQueue[errorEnvironment._id][errorWorkflow.id];
		}
	});
	self.khEventHandler.on("workflow-cancel", function(cancelEnvironment, cancelWorkflow) {
		console.log(cancelWorkflow.id +"cancelled on "+agentToString(cancelEnvironment));
		if (workflowQueue[cancelEnvironment._id] && workflowQueue[cancelEnvironment._id][cancelWorkflow.id]) {
			workflowQueue[cancelEnvironment._id][cancelWorkflow.id](new Error(cancelWorkflow.id +"job error on "+agentToString(cancelEnvironment)));
			delete workflowQueue[cancelEnvironment._id][cancelWorkflow.id];
		}
	});
	
	self.executeWorkflow = executeWorkflow.bind({serverURL: serverURL, khClient: khClient});
	self.executeWorkflowSync = executeWorkflowSync.bind({serverURL: serverURL});
	self.cancelWorkflow = cancelWorkflow.bind({serverURL: serverURL});
	self.getRunningWorkflowsList = getRunningJobsList.bind({serverURL: serverURL});
	self.connectEnvironmentAgents = connectEnvironmentAgents.bind({serverURL: serverURL});
	
	return self;
}

module.exports = KHWorkflow;
KHWorkflow.prototype.executeWorkflow = executeWorkflow;
KHWorkflow.prototype.cancelWorkflow = cancelWorkflow;
KHWorkflow.prototype.getRunningWorkflowsList = getRunningWorkflowsList;
KHWorkflow.prototype.connectEnvironmentAgents = connectEnvironmentAgents;

exports.executeWorkflow = executeWorkflow;
exports.cancelWorkflow = cancelWorkflow;
exports.getRunningWorkflowsList = getRunningWorkflowsList;