var request = require('request');
var khRepo = require('./kh-repository');
var async = require('async');

var jobQueue={};


function agentToString(agent) {
	return agent.user+'@'+agent.host+':'+agent.port+'('+agent._id+')';
}

/**
 * Executes a job on a knowhow server
 *
 * @param agent - agentInfo _id is required is requred - ex: \{_id: "1234"\}
 * @param job - a json job to execute
 * @param callback - callback function with parameters (error, agentInfo)
 */
var executeJob = function(agent, job, callback) {

	
	if (job.jobRef) {
		console.log("jobref detected - getting job: "+job.jobRef);
		repoName = job.jobRef.split('://')[0];
		this.khClient.khRepository.loadRepoFromName(repoName, function(err, loadedRepo) {
			if (err) {
				callback(err);
				return;
			}
			console.log("loaded repository");
			var path = decodeURI(job.jobRef).split('://')[1];
			if (path && path.indexOf[0] != '/') {
				path = '/'+path;
			}
			this.khClient.khRepository.loadFile(loadedRepo, loadedRepo.path+path, function (err, jobFromRepo) {
				 if (err) {
				 	console.log(err.stack);
				 	callback(err);
				 	return;
				 } else {
					 console.log("loaded: "+jobFromRepo.id);
					 
					 if (job.script && job.script.env) {
					 	if (!jobFromRepo.script) {
					 		jobFromRepo.script = {
					 			env: {}
					 		};
					 	} else if (!job.script.env) {
					 		job.script.env = {};
					 	}
					 	var keys = Object.keys(job.script.env)
					 	for (index in keys) {
					 		var VAR = keys[index];
					 		jobFromRepo.script.env[VAR] = job.script.env[VAR];
					 		console.log(VAR+" = "+jobFromRepo.script.env[VAR]);;
					 	}
					 }
					 if (job.env) {
					 	if (!jobFromRepo.env) {
					 		jobFromRepo.env = {};
					 	}
					 	var keys = Object.keys(job.env);
					 	for (index in keys) {
					 		var VAR = keys[index];
					 		console.log("substituing: "+VAR);
					 		jobFromRepo.env[VAR] = job.env[VAR];
					 	}
					 }
					 console.log(require('util').inspect(jobFromRepo, {depth:null}));
					 if (!agent.id) {
						this.khClient.khAgent.getAgentInfo(agent, function(err, agentInfo) {
							executeOnServer(this.serverURL, agentInfo, jobFromRepo, callback);
						});
					} else {
						executeOnServer(this.serverURL, agent, jobFromRepo, callback);
					}
				}
			});
		});
	} else {
		if (!agent.id) {
			this.khClient.khAgent.getAgentInfo(agent, function(err, agentInfo) {
				executeOnServer(this.serverURL, agentInfo, job, callback);
			});
		} else {
			executeOnServer(this.serverURL, agent, job, callback);
		}
	}

}

/**
 * Synchronous version of addAgent call
 *
 * @param agentInfo json representaion of the agent to add
 * @param job to run
 */
var executeJobSync = function(agent, job) {
	async.series([
	    function(callback){
	        executeJob.bind({serverURL: serverURL})(agent, job, callback);
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

var executeOnServer = function(serverURL, agent, job, callback) {
	
	 console.log("posting to: "+serverURL+'/api/execute on agent '+agent.user+'@'+agent.host+':'+agent.port+'('+agent._id+')');
	
	if (!jobQueue[agent._id]) {
		jobQueue[agent._id] = {};
	}
	jobQueue[agent._id][job.id] = callback;
	var data = {
	    	khAgent: agent,
	    	job: job
	    };
	 //console.log(data);
	 request({ method: 'POST'
	    , uri: serverURL+'/api/execute'
	    , body:data
	    , json: true
    }, function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
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
 * Cancels a running job on a knowhow server
 *
 * @param agent - agentInfo _id is required is requred - ex: \{_id: "1234"\}
 * @param job - a json job to execute
 * @param callback - callback function with parameters (error, agentInfo)
 */
var cancelJob = function(agent, job) {
	var data = {
	    	khAgent: agent,
	    	job: job
	    };
	 request({ method: 'POST'
	    , uri: this.serverURL+'/api/cancelJob'
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
 * Retreives a list of currently executing jobs on a knowhow server
 *
 * @param agent - agentInfo _id is required is requred - ex: \{_id: "1234"\}
 * @param callback - callback function with parameters (error, runningJobList)
 */ 
var getRunningJobsList = function(callback) {
	request.get(this.serverURL+'/api/runningJobsList' ,
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
 * Factory method for KHJob
 * @param serverURL the url of the server
 * @param EventHandler
 */
function KHJob(serverURL, khEventHandler, khClient){
	self=this;
	self.serverURL = serverURL;
	self.khEventHandler = khEventHandler;
	self.khClient = khClient;
	self.khEventHandler.on("job-complete", function(completedAgent, completedJob) {
		
		console.log(completedJob.id+" done on agent: "+completedAgent.user+"@"+completedAgent.host+":"+completedAgent.port+"("+completedAgent._id+")");
		console.log(jobQueue);
		if (jobQueue[completedAgent._id] && jobQueue[completedAgent._id][completedJob.id]) {
			jobQueue[completedAgent._id][completedJob.id](undefined,completedJob);
			delete jobQueue[completedAgent._id][completedJob.id];
		}
	});
	self.khEventHandler.on("job-error", function(errorAgent, errorJob) {
		console.log(errorJob.id +"job error on "+errorAgent.user+"@"+errorAgent.host+":"+errorAgent.port+" id: "+errorAgent._id);
		console.error(job.message);
		if (jobQueue[errorAgent._id] && jobQueue[errorAgent._id][errorJob.id]) {
			jobQueue[errorAgent._id][errorJob.id](new Error(errorJob.id +"job error on "+errorAgent.user+"@"+errorAgent.host+":"+errorAgent.port+"("+errorAgent._id)+")");
			delete jobQueue[errorAgent._id][errorJob.id];
		}
	});
	self.khEventHandler.on("job-cancel", function(cancelAgent, cancelJob) {
		console.log(cancelAgent);
		if (jobQueue[cancelAgent._id] && jobQueue[cancelAgent._id][cancelJob.id]) {
			jobQueue[cancelAgent._id][cancelJob.id](new Error(cancelJob.id +"job error on "+cancelAgent.user+"@"+cancelAgent.host+":"+cancelAgent.port+"("+cancelAgent._id+")"));
			delete jobQueue[cancelAgent._id][cancelJob.id];
		}
	});
	self.khEventHandler.on("execution-error", function(agent, command) {
		console.log("execution error on: "+agentToString(agent)+" "+command.output+" return code: "+command.returnCode);
	});
	self.khEventHandler.on("execution-complete", function(agent, command) {
		console.log("execution complete on: "+agentToString(agent)+" "+command.output);
	});
	
	self.executeJob = executeJob.bind({serverURL: serverURL, khClient: khClient});
	self.executeJobSync = executeJobSync.bind({serverURL: serverURL});
	self.cancelJob = cancelJob.bind({serverURL: serverURL});
	self.getRunningJobsList = getRunningJobsList.bind({serverURL: serverURL});
	
	return self;
}

module.exports = KHJob;
KHJob.prototype.executeJob = executeJob;
KHJob.prototype.cancelJob = cancelJob;
KHJob.prototype.getRunningJobsList = getRunningJobsList;

exports.executeJob = executeJob;
exports.cancelJob = cancelJob;
exports.getRunningJobsList = getRunningJobsList;