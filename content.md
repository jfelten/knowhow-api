#knowhow-api [![Build Status](https://travis-ci.org/jfelten/knowhow-api.svg?branch=master)](https://travis-ci.org/jfelten/knowhow-api)

This is a node.js api for connect and manipulating a knowhow server.  A command line tool that exposes the API to bash, KHCommand, is also provided for shell scripting.  Uses of this API include:

* creating and deleting repositories
* add and deleting file in repositories
* adding and deleting agents
* executing jobs
* executing other knowhow jobs from knowhow itself

#Installation

This is installed by default when installing knowhow package.  If you want to install this package individually

		npm install -g knowhow-api
		
#Examples

###List all active repositories on a knowhow server

		var serverURL = "http://localhost:3001";
		var khClient =  require('knowhow-api')(serverURL);
		khClient.khRepository.listRepositories(function(err, repos) {
		  	if (err) {
		  		console.log("unable to get repositories: "+err.message);
				console.log(err.stack);
				callback(err);
				return;
		  	}
		  	console.log(repos);
		});

or using KHCommand

		KHCommand listRepositories http://localhost:3001
		 
##Execute a job on a knowhow server

		var serverURL = "http://localhost:3001";
		var khClient =  require('knowhow-api')(serverURL);
		testJob = { "jobRef": "MyRepo://jobs/dummyJob.json"}
		khClient.khJob.executeJob(agent, createAgentJob, function (err, result) {
			
		});
		
or using KHCommand
		
		KHCommand executeJob http://localhost:3001 '{"host": "container02", "user": "serverClub", "password": "serverClub", "port": 3141}' '{"jobRef": "zenzic:///jobs/dummyJob.json"}'

##Add/delete an agent

	var serverURL = "http://localhost:3001";
	var khClient =  require('knowhow-api')(serverURL);
	var agentInfo = {
			"host": "myHost",
			"user": "myUser",
			"password": "myPassword",
			"port": 3141
		};
	
	//add agent
	khClient.khAgent.addAgent(agentInfo, function(err, addedAgent) {
	
	});
	
	//delete agent
	khClient.khAgent.deleteAgent(agentInfo, function(err, deletedAgent) {
	
	});
	
or using KHCommand:
	KHCommand.sh addAgent http://localhost:3001 '{"host": "container02", "user": "serverClub", "password": "serverClub", "port": 3141}'

##other examples:

add a file to a repository, create a new repository, delete a repository, delete a file in a repository, add an agent, delete and agent, execute a workflow

###knowhow urls

All files and resources on a knowhow server are designed to be accessed in url syntax:

		<REPO_NAME>://<PATH_TO_RESOURCE>

For example: MyRepo:///jobs/myJob.json would refer to the file myJob.json located in the jobs folder of the MyRepo repositorhy


###Events

An event listener is provided to listen for the following server side events:

* 'agent-update' 
* 'agent-error'
* 'agent-delete'
* 'agent-add'
* 'job-start'
* 'job-update'
* 'job-cancel'
* 'job-complete'
* 'job-error'
* 'cancel-job-on-agent'
* 'execution-complete'
* 'execution-error'
	
Example:
		var serverURL = "http://localhost:3001";
		var khEventHandler = require('knowhow-api').khEventsHandler(serverURL);
		khEventHandler.on("job-complete", function(job) {
			console.log("done event");
		});


#API