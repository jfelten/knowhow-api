var request = require('request');
var khRepo = require('./kh-repository');
var async = require('async');

/**
 * Executes a job on a knowhow server
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param agent - agentInfo _id is required is requred - ex: \{_id: "1234"\}
 * @param job - a json job to execute
 * @param callback - callback function with parameters (error, agentInfo)
 */
var executeJob = function(serverURL, agent, job, callback) {

	if (job.jobRef) {
		repoName = job.jobRef.split(':')[0];
		khRepo.loadRepoFromName(serverURL, repoName, function(err, loadedRepo) {
			if (err) {
				throw err;
			}
			var path = decodeURI(job.jobRef).split('://')[1];
			if (path && path.indexOf[0] != '/') {
				path = '/'+path;
			}
			khRepo.loadFile(serverURL,loadedRepo, loadedRepo.path+path, function (err, jobFromRepo) {
				 if (err) {
				 	throw err;
				 }
				 
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
				 	var keys = Object.keys(job.env);
				 	for (VAR in keys) {
				 		var VAR = keys[index];
				 		jobFromRepo.env[VAR] = job.env[VAR];
				 	}
				 }
				 console.log(require('util').inspect(jobFromRepo, {depth:null}));
				 executeOnServer(serverURL, agent, jobFromRepo, callback);
			});
		});
	} else {
		executeOnServer(serverURL, agent, job, callback);
	}

}

/**
 * Synchronous version of addAgent call
 *
 * @param serverURL the knowhow server URL
 * @param agentInfo json representaion of the agent to add
 */
var executeJobSync = function(serverURL, agent, job) {
	async.series([
	    function(callback){
	        executeJob(serverURL, agent, job, callback)
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
	var data = {
	    	khAgent: agent,
	    	job: job
	    };
	 console.log("posting to: "+serverURL+'/api/execute');
	 console.log(data);
	 request({ method: 'POST'
	    , uri: serverURL+'/api/execute'
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
	        	var khEventHandler = new require('../kh-api/kh-events-handler')(serverURL);
				khEventHandler.on("job-complete", function(completedAgent, completedJob) {
					console.log("done event");
					if (agentEquals(agent,completedAgent) && job.id == completedJob.id) {
						khEventHandler.removeAllListeners();
						callback(undefined, completedJob);
					}
				});
				khEventHandler.on("job-error", function(errorAgent, errorJob) {
					if (agentEquals(agent,errorAgent) && job.id == errorJob.id) {
						var message = "job error";
						if (errorJob && errorJob.message) {
							message = errorJob.message
						}
						khEventHandler.removeAllListeners();
						callback(new Error(message));
					}
				});
				khEventHandler.on("job-cancel", function(cancelAgent, cancelJob) {
					if ( agentEquals(agent,cancelAgent) && job.id == cancelJob.id) {
						var message = "job cancelled";
						if (cancelJob && cancelJob.message) {
							message = cancelJob.message
						}
						khEventHandler.removeAllListeners();
						callback(new Error(message));
					}
				});
	        	
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
var cancelJob = function(serverURL, agent, job) {
	var data = {
	    	khAgent: agent,
	    	job: job
	    };
	 request({ method: 'POST'
	    , uri: serverURL+'/api/cancelJob'
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
var getRunningJobsList = function(serverURL, callback) {
	request.get(serverURL+'/api/runningJobsList' ,
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

function removeAllJobEventListeners(emitter) {

	emitter.removeListener('job-complete');
	emitter.removeListener('job-error');
	emitter.removeListener('job-cancel');
}

exports.executeJob = executeJob;
exports.cancelJob = cancelJob;
exports.getRunningJobsList = getRunningJobsList;