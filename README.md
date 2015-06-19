# knowhow-api [![Build Status](https://travis-ci.org/jfelten/knowhow-api.svg?branch=master)](https://travis-ci.org/jfelten/knowhow-api)

This is a node.js api for connect and manipulating a knowhow server.  A command line tool that exposes the API to bash, KHCommand, is also provided for shell scripting.  Uses of this API include:

* creating and deleting repositories
* add and deleting file in repositories
* adding and deleting agents
* executing jobs
* executing other knowhow jobs from knowhow itself

# Installation

This is installed by default when installing knowhow package.  If you want to install this package individually

		npm install -g knowhow-api
		
# Examples

### List all active repositories on a knowhow server

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
		 
## Execute a job on a knowhow server

		var serverURL = "http://localhost:3001";
		var khClient =  require('knowhow-api')(serverURL);
		testJob = { "jobRef": "MyRepo://jobs/dummyJob.json"}
		khClient.khJob.executeJob(agent, createAgentJob, function (err, result) {
			
		});
		
or using KHCommand
		
		KHCommand executeJob http://localhost:3001 '{"host": "container02", "user": "serverClub", "password": "serverClub", "port": 3141}' '{"jobRef": "zenzic:///jobs/dummyJob.json"}'

## Add/delete an agent

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

## Import a repository from GIT

		var exampleRepo = {
			"name": "knowhow-example",
			"path": "/tmp/knowhow-example"
		};
		var gitURL = "https://github.com/jfelten/knowhow_example_repo.git";
		var gitUser = undefined;
		var gitPassword = undefined;
		khClient.khRepository.importFileRepositoryFromGit(exampleRepo, gitURL, gitUser, gitPassword, function(err, loadedRepo) {
		});
	
## Download a repository as a tarball

		khClient.khRepository.downloadRepoAsTarBall(exampleRepo, './testRepo.tar.gz', function(err, savedPath) {
		});
	
## Execute a workflow

		khClient.khRepository.loadURL("knowhow-example:///environments/test/environment.json", function(err, testEnvironment) {
			if (err) {
				console.log(err.stack);
				return;
				throw err;
				prcoess.exit(1);
			}
			//connect all the agents for the environment
			khClient.khWorkflow.connectEnvironmentAgents(testEnvironment, function(err) {
			
				if (err) {
					throw err;
					prcoess.exit(1);
				}
				//load a test workflow and execute it
				khClient.khRepository.loadURL("knowhow-example:///workflows/test/testWorkflow.json", function(err, testWorkflow){
					if (err) {
						throw err;
						prcoess.exit(1);
					}
					khClient.khWorkflow.executeWorkflow(testEnvironment, testWorkflow,function(err, workflowREsult) {
						process.exit(0);
					});
					
				});
			});
		});


## other examples:

add a file to a repository, create a new repository, delete a repository, delete a file in a repository

### knowhow urls

All files and resources on a knowhow server are designed to be accessed in url syntax:

		<REPO_NAME>://<PATH_TO_RESOURCE>

For example: MyRepo:///jobs/myJob.json would refer to the file myJob.json located in the jobs folder of the MyRepo repositorhy


### Events

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
* 'execution-start'
* 'execution-complete'
* 'execution-error'
* 'execution-password-prompt'
	
Example:
		var serverURL = "http://localhost:3001";
		var khEventHandler = require('knowhow-api').khEventsHandler(serverURL);
		khEventHandler.on("job-complete", function(job) {
			console.log("done event");
		});


# API

## Agent API (accessed via khClient.khAgent)
## Functions
<dl>
<dt><a href="#addAgent">addAgent(agentInfo, callback)</a></dt>
<dd><p>Adds a new agent to a knowhow server.  If no login or password is specified it will attempt to scan for an already
running agent on the specified host.  If no port is specified the port 3141 is used.  Plain text passwords may be used, but 
is discouraged.  Use passowrddEnc to pass encrypted passwords that are descryped using the server&#39;s encrytion key</p>
</dd>
<dt><a href="#addAgentSync">addAgentSync(agentInfo)</a></dt>
<dd><p>Synchronous version of addAgent call</p>
</dd>
<dt><a href="#updateAgent">updateAgent(agentInfo, callback)</a></dt>
<dd><p>Updates agent info with values specified in agentInfo</p>
</dd>
<dt><a href="#deleteAgent">deleteAgent(agentInfo, callback)</a></dt>
<dd><p>deletes an agent on a knowhow server</p>
</dd>
<dt><a href="#deleteAgentSync">deleteAgentSync(agentInfo)</a> ⇒</dt>
<dd><p>deletes an agent on a knowhow server</p>
</dd>
<dt><a href="#resetAgent">resetAgent(agentInfo, callback)</a></dt>
<dd><p>resets an agent on a knowhow server by stopping and restarting.</p>
</dd>
<dt><a href="#resetAgentSync">resetAgentSync(agentInfo)</a></dt>
<dd><p>Synchronous version of addAgent call</p>
</dd>
<dt><a href="#getAgentInfo">getAgentInfo(agentInfo, callback)</a></dt>
<dd><p>retrives agent info base on _id.</p>
</dd>
<dt><a href="#getAgentLogs">getAgentLogs(agentInfo, callback)</a></dt>
<dd><p>retrives agent info base on _id.</p>
</dd>
<dt><a href="#getAgentList">getAgentList(callback)</a></dt>
<dd><p>retrieves a list of all agents on a knowhow server</p>
</dd>
<dt><a href="#agentHeartbeat">agentHeartbeat(agent, callback)</a> ⇒</dt>
<dd><p>Checks if an agent is alive by attempting to contact it through the server.</p>
</dd>
<dt><a href="#waitForAgentStartup">waitForAgentStartup(agent, callback)</a> ⇒</dt>
<dd><p>Waits for an agent to start up and returns when done.  Used for flow control in scripts.</p>
</dd>
</dl>
<a name="addAgent"></a>
## addAgent(agentInfo, callback)
Adds a new agent to a knowhow server.  If no login or password is specified it will attempt to scan for an already
running agent on the specified host.  If no port is specified the port 3141 is used.  Plain text passwords may be used, but 
is discouraged.  Use passowrddEnc to pass encrypted passwords that are descryped using the server's encrytion key

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo only host is requred - ex: \{"host": "myHost", "port": 3141, "user": "MyUSer", "passwordEnc": "DSAF@#R##EASDSAS@#"\} |
| callback | callback function with parameters (error, agentInfo) |

<a name="addAgentSync"></a>
## addAgentSync(agentInfo)
Synchronous version of addAgent call

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | json representaion of the agent to add |

<a name="updateAgent"></a>
## updateAgent(agentInfo, callback)
Updates agent info with values specified in agentInfo

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo must specify _id - ex: \{"_id": "1234:", "host": "myHost", "port": 3141, "user": "MyUser", "passwordEnc": "DSAF@#R##EASDSAS@#"\} |
| callback | callback function with parameters (error, agentInfo) |

<a name="deleteAgent"></a>
## deleteAgent(agentInfo, callback)
deletes an agent on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo must specify _id - ex: \{"_id": "1234"\} |
| callback | callback function with parameters (error, agentInfo) |

<a name="deleteAgentSync"></a>
## deleteAgentSync(agentInfo) ⇒
deletes an agent on a knowhow server

**Kind**: global function  
**Returns**: agent or undefined if it didn't work  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo must specify _id - ex: \{"_id": "1234"\} |

<a name="resetAgent"></a>
## resetAgent(agentInfo, callback)
resets an agent on a knowhow server by stopping and restarting.

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo only host is requred - ex: \{"host": "myHost", "port": 3141, "user": "MyUSer", "passwordEnc": "DSAF@#R##EASDSAS@#"\} |
| callback | callback function with parameters (error, agentInfo) |

<a name="resetAgentSync"></a>
## resetAgentSync(agentInfo)
Synchronous version of addAgent call

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | json representaion of the agent to add |

<a name="getAgentInfo"></a>
## getAgentInfo(agentInfo, callback)
retrives agent info base on _id.

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo must specify _id - ex: _id: "1234" |
| callback | callback function with parameters (error, agentInfo) |

<a name="getAgentLogs"></a>
## getAgentLogs(agentInfo, callback)
retrives agent info base on _id.

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | agentInfo must specify _id - ex: 1234 |
| callback | callback function with parameters (error, agentInfo) |

<a name="getAgentList"></a>
## getAgentList(callback)
retrieves a list of all agents on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | callback function with parameters (error, agentInfo) |

<a name="agentHeartbeat"></a>
## agentHeartbeat(agent, callback) ⇒
Checks if an agent is alive by attempting to contact it through the server.

**Kind**: global function  
**Returns**: \{alive: true\} if the agent can be reached.  

| Param | Description |
| --- | --- |
| agent | agent json |
| callback |  |

<a name="waitForAgentStartup"></a>
## waitForAgentStartup(agent, callback) ⇒
Waits for an agent to start up and returns when done.  Used for flow control in scripts.

**Kind**: global function  
**Returns**: \{alive: true\} if the agent can be reached.  

| Param | Description |
| --- | --- |
| agent | agent json |
| callback |  |



## Repository API (accessed via khClient.khRepository)
## Functions
<dl>
<dt><a href="#listRepositories">listRepositories(serverURL, callback)</a></dt>
<dd><p>Lists all repositories on a server</p>
</dd>
<dt><a href="#loadRepoFromName">loadRepoFromName(repoName, callback)</a></dt>
<dd><p>loads a populated repo json object based on a name</p>
</dd>
<dt><a href="#addRepo">addRepo(newRepo)</a></dt>
<dd><p>Adds a new repository to a knowhow server specified by param serverUDL</p>
</dd>
<dt><a href="#updateRepo">updateRepo(serverURL, existingRepo, callback)</a></dt>
<dd><p>Modifies an existing repo obejct on a knowhow server with the values specified in the repo object</p>
</dd>
<dt><a href="#deleteRepo">deleteRepo(repo, callback)</a></dt>
<dd><p>Deletes a repository on a knowhow server</p>
</dd>
<dt><a href="#loadRepo">loadRepo(repo, subDir, callback)</a></dt>
<dd><p>Returns a directory tree structure starting at a specified subDir- used to load a tree widget</p>
</dd>
<dt><a href="#addFile">addFile(path, newFile, content, isDirectory, callback)</a></dt>
<dd><p>Adds a file to specified repository</p>
</dd>
<dt><a href="#deleteFile">deleteFile(filePath, force, callback)</a></dt>
<dd><p>Deletes specified file from a repository</p>
</dd>
<dt><a href="#saveFile">saveFile(filePath, fileContent, callback)</a></dt>
<dd><p>saves a file    in the specified filePAth on a knowhow server</p>
</dd>
<dt><a href="#loadURL">loadURL(URL)</a></dt>
<dd><p>retrieves an environment object from a knowhow URL</p>
</dd>
<dt><a href="#importFileRepositoryFromGit">importFileRepositoryFromGit(repo, gitURL, gitUser, gitPAssword, callback)</a></dt>
<dd><p>Imports a repository from a git server Url into a new file repository.</p>
</dd>
<dt><a href="#importFileRepositoryFromTarBall">importFileRepositoryFromTarBall(repo, tarBallFile, callback)</a></dt>
<dd><p>Imports a repository from a tarball(.tar.gz) file</p>
</dd>
<dt><a href="#importFileRepositoryFromServer">importFileRepositoryFromServer(repoToCreate, KHHostRepoName, KHServerURL, callback)</a></dt>
<dd><p>Imports a repository from a a knowhow server</p>
</dd>
<dt><a href="#downloadRepoAsTarBall">downloadRepoAsTarBall(repo, savePath)</a></dt>
<dd><p>Downloads a knowhow repository as a tarball.  This tarball may be reimport as a new repository on any knowhow server.</p>
</dd>
<dt><a href="#KHRepository">KHRepository(serverURL, EventHandler)</a></dt>
<dd><p>Factory method for KHJob</p>
</dd>
</dl>
## Typedefs
<dl>
<dt><a href="#loadFile">loadFile</a> : <code>function</code></dt>
<dd><p>Loads a File from the specified repository</p>
</dd>
</dl>
<a name="listRepositories"></a>
## listRepositories(serverURL, callback)
Lists all repositories on a server

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL |  |
| callback | function to call when done with parameters (error, repoList) |

<a name="loadRepoFromName"></a>
## loadRepoFromName(repoName, callback)
loads a populated repo json object based on a name

**Kind**: global function  

| Param | Description |
| --- | --- |
| repoName | the name of the repositry |
| callback | callback function to execute when complete with parameters (error, repoObject) |

<a name="addRepo"></a>
## addRepo(newRepo)
Adds a new repository to a knowhow server specified by param serverUDL

**Kind**: global function  

| Param | Description |
| --- | --- |
| newRepo | A json object describing the new repository with parameters (error, repoObject) |

<a name="updateRepo"></a>
## updateRepo(serverURL, existingRepo, callback)
Modifies an existing repo obejct on a knowhow server with the values specified in the repo object

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the URL of the knowhow server ex :http://localhost:3001 |
| existingRepo | a json object describing a repository - _id must be specified |
| callback | callback functions with parameters (error, modifiedRepoObject) |

<a name="deleteRepo"></a>
## deleteRepo(repo, callback)
Deletes a repository on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object representing the repo to delete - _id must be specified |
| callback | callback function with parameters (error, deletedRepo) |

<a name="loadRepo"></a>
## loadRepo(repo, subDir, callback)
Returns a directory tree structure starting at a specified subDir- used to load a tree widget

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object representing a repository to use |
| subDir | the point in the repository to start - ex: /jobs |
| callback | callback function with params (error, repoTree) |

<a name="addFile"></a>
## addFile(path, newFile, content, isDirectory, callback)
Adds a file to specified repository

**Kind**: global function  

| Param | Description |
| --- | --- |
| path | the repository path of the file - ex: /jobs/myJob.json |
| newFile | new file name |
| content | text content of the file to add |
| isDirectory | flag for whether of not file is a directory |
| callback | callback function with parameters (error, newFile) |

<a name="deleteFile"></a>
## deleteFile(filePath, force, callback)
Deletes specified file from a repository

**Kind**: global function  

| Param | Description |
| --- | --- |
| filePath | the absolute directory structure of the file to delete ex /myRepo/job/myJob.json |
| force |  |
| callback | callback function with parameters (error, deletedFile) |

<a name="saveFile"></a>
## saveFile(filePath, fileContent, callback)
saves a file	in the specified filePAth on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| filePath | the absolute directory path of a specified file on the knowhow server host |
| fileContent | the text content of the file |
| callback | callbacj function with params (error, file) |

<a name="loadURL"></a>
## loadURL(URL)
retrieves an environment object from a knowhow URL

**Kind**: global function  

| Param | Description |
| --- | --- |
| URL | the knowhow URL we are attempting to load |

<a name="importFileRepositoryFromGit"></a>
## importFileRepositoryFromGit(repo, gitURL, gitUser, gitPAssword, callback)
Imports a repository from a git server Url into a new file repository.

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object with the expected repo values: name and path |
| gitURL | URL of the git repository |
| gitUser | if supplied will attempt to use as part of the url |
| gitPAssword | use only if server requires password authentication |
| callback | to execute when finished |

<a name="importFileRepositoryFromTarBall"></a>
## importFileRepositoryFromTarBall(repo, tarBallFile, callback)
Imports a repository from a tarball(.tar.gz) file

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | a json object with the expected repo values: name and path |
| tarBallFile | the file path of the tarball file |
| callback | to execute when finished |

<a name="importFileRepositoryFromServer"></a>
## importFileRepositoryFromServer(repoToCreate, KHHostRepoName, KHServerURL, callback)
Imports a repository from a a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| repoToCreate | a json object with the expected repo values: name and path |
| KHHostRepoName | the name of the repo on the knowhow server we are importing from |
| KHServerURL | the url of the knowhow server |
| callback | to execute when finished |

<a name="downloadRepoAsTarBall"></a>
## downloadRepoAsTarBall(repo, savePath)
Downloads a knowhow repository as a tarball.  This tarball may be reimport as a new repository on any knowhow server.

**Kind**: global function  

| Param | Description |
| --- | --- |
| repo | the knowhow repository to download |
| savePath | where to save the tarball |

<a name="KHRepository"></a>
## KHRepository(serverURL, EventHandler)
Factory method for KHJob

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the url of the server |
| EventHandler |  |

<a name="loadFile"></a>
## loadFile : <code>function</code>
Loads a File from the specified repository

**Kind**: global typedef  

| Param | Description |
| --- | --- |
| serverURL | the URL of the knowhow server ex :http://localhost:3001 |
| repo | a json object representing a repository to use |
| path | the repository path of the file - ex: /jobs/myJob.json |



## Job API (accessed via khClient.khJob)
## Functions
<dl>
<dt><a href="#executeJob">executeJob(agent, job, callback)</a></dt>
<dd><p>Executes a job on a knowhow server</p>
</dd>
<dt><a href="#executeJobSync">executeJobSync(agentInfo, job)</a></dt>
<dd><p>Synchronous version of addAgent call</p>
</dd>
<dt><a href="#cancelJob">cancelJob(agent, job, callback)</a></dt>
<dd><p>Cancels a running job on a knowhow server</p>
</dd>
<dt><a href="#getRunningJobsList">getRunningJobsList(agent, callback)</a></dt>
<dd><p>Retreives a list of currently executing jobs on a knowhow server</p>
</dd>
<dt><a href="#KHJob">KHJob(serverURL, EventHandler)</a></dt>
<dd><p>Factory method for KHJob</p>
</dd>
</dl>
<a name="executeJob"></a>
## executeJob(agent, job, callback)
Executes a job on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| agent | agentInfo _id is required is requred - ex: \{_id: "1234"\} |
| job | a json job to execute |
| callback | callback function with parameters (error, agentInfo) |

<a name="executeJobSync"></a>
## executeJobSync(agentInfo, job)
Synchronous version of addAgent call

**Kind**: global function  

| Param | Description |
| --- | --- |
| agentInfo | json representaion of the agent to add |
| job | to run |

<a name="cancelJob"></a>
## cancelJob(agent, job, callback)
Cancels a running job on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| agent | agentInfo _id is required is requred - ex: \{_id: "1234"\} |
| job | a json job to execute |
| callback | callback function with parameters (error, agentInfo) |

<a name="getRunningJobsList"></a>
## getRunningJobsList(agent, callback)
Retreives a list of currently executing jobs on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| agent | agentInfo _id is required is requred - ex: \{_id: "1234"\} |
| callback | callback function with parameters (error, runningJobList) |

<a name="KHJob"></a>
## KHJob(serverURL, EventHandler)
Factory method for KHJob

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the url of the server |
| EventHandler |  |



## Workflow API (accessed via khClient.khWorkflow)
## Functions
<dl>
<dt><a href="#loadAgentsForEnvironment">loadAgentsForEnvironment(environment)</a></dt>
<dd><p>loads all agents on an environment.  Returns with the agent data fully populated</p>
</dd>
<dt><a href="#connectEnvironmentAgents">connectEnvironmentAgents(environment)</a></dt>
<dd><p>Ensures that all agents for an environment are running.  IF a defined agent does not exist an attempt is made to add it.</p>
</dd>
<dt><a href="#executeWorkflow">executeWorkflow(environment, workflow, callback)</a></dt>
<dd><p>Executes a workflow on a knowhow server</p>
</dd>
<dt><a href="#executeWorkflowSync">executeWorkflowSync(environment, workflow)</a></dt>
<dd><p>Synchronous version of addWorkflow call</p>
</dd>
<dt><a href="#cancelWorkflow">cancelWorkflow(environment, workflow, callback)</a></dt>
<dd><p>Cancels a running workflow on a knowhow server</p>
</dd>
<dt><a href="#getRunningWorkflowsList">getRunningWorkflowsList(callback)</a></dt>
<dd><p>Retreives a list of currently executing workflows on a knowhow server</p>
</dd>
<dt><a href="#KHWorkflow">KHWorkflow(serverURL, khEventHandler, the, khClient)</a></dt>
<dd><p>Factory method for KHWorkflow</p>
</dd>
</dl>
<a name="loadAgentsForEnvironment"></a>
## loadAgentsForEnvironment(environment)
loads all agents on an environment.  Returns with the agent data fully populated

**Kind**: global function  

| Param | Description |
| --- | --- |
| environment | the environment to load |

<a name="connectEnvironmentAgents"></a>
## connectEnvironmentAgents(environment)
Ensures that all agents for an environment are running.  IF a defined agent does not exist an attempt is made to add it.

**Kind**: global function  

| Param | Description |
| --- | --- |
| environment | an environment json object |

<a name="executeWorkflow"></a>
## executeWorkflow(environment, workflow, callback)
Executes a workflow on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| environment | json environment representation (i.e. collection of knowhow agents that represent the environment) |
| workflow | a json workflow to execute |
| callback | callback function with parameters (error, agentInfo) |

<a name="executeWorkflowSync"></a>
## executeWorkflowSync(environment, workflow)
Synchronous version of addWorkflow call

**Kind**: global function  

| Param | Description |
| --- | --- |
| environment | json representaion of the workflow's environment |
| workflow | to run |

<a name="cancelWorkflow"></a>
## cancelWorkflow(environment, workflow, callback)
Cancels a running workflow on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| environment | environment to cancel |
| workflow | a json workflow to execute |
| callback | callback function with parameters (error, agentInfo) |

<a name="getRunningWorkflowsList"></a>
## getRunningWorkflowsList(callback)
Retreives a list of currently executing workflows on a knowhow server

**Kind**: global function  

| Param | Description |
| --- | --- |
| callback | callback function with parameters (error, runningJobList) |

<a name="KHWorkflow"></a>
## KHWorkflow(serverURL, khEventHandler, the, khClient)
Factory method for KHWorkflow

**Kind**: global function  

| Param | Description |
| --- | --- |
| serverURL | the url of the server |
| khEventHandler | EventHandler |
| the | khJob object for this workflow engine |
| khClient |  |



## Event API (accessed via khClient.khEventHandler)


## commits since last release
		fix more jsdoc tags
 		fixed @returns annotation
 		fix documentation typo
 		expose wait for startup and heartbeat methods in agent api
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		added heartbeat and waitForStartup methods for better scripting control flow when automatically starting and stopping knowhow servers and agents. Added a test for KHCommand.
 		0.0.19
 		updated documentation
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		0.0.18
 		updated documentation
 		added space to render properly on github
 		Update aPI tempalte
 		updated documentation to fix npm formatting issues and to break up apis into separate sections
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		0.0.17
 		updated documentation
 		fix documentation so it renders properly on github
 		added new examples
 		Completed workflow API, Added additona tests, fix agent api runtime errors
 		added workflow commands
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		fix load URL call
 		fix typo
 		0.0.16
 		updated documentation
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		add latest repository functions to KHCommand
 		added repository page functions to API as well as eom real unit tests
 		0.0.15
 		updated documentation
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		0.0.14
 		updated documentation
 		fix runtime error - make error handling a little mroe robust
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		fix environment substitution and add more verbose command output
 		0.0.13
 		updated documentation
 		0.0.12
 		updated documentation
 		0.0.11
 		updated documentation
 		fix KHCommand error handling
 		0.0.10
 		updated documentation
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		fixed job execution api and agent createion api. properly parse json objects from command line tool. Correct callback after job execution. Updated documentation to reflect correct usage examples
 		0.0.9
 		updated documentation
 		updated version
 		updated test
 		added travis buiuld icon
 		added build test
 		Merge remote-tracking branch 'origin/master'
 		added travis file
 		0.0.7
 		updated documentation
 		Merge branch 'master' of https://github.com/jfelten/knowhow-api.git
 		fix execution issues
 		job execution fixes
 		0.0.6
 		updated documentation
 		0.0.5
 		updated documentation
 		Update README.md
 		incremented version
 		fix command line doc generation
 		Merge remote-tracking branch 'origin/master'
 		moved to a client model for easier event management
 		moved to a client model where events are managed for synchronous processing
 		0.0.3
 		updated documentation
 		fix package executable error
 		Merge remote-tracking branch 'origin/master'
 		fixed event list
 		Update README.md
 		0.0.2
 		updated documentation
 		configured readme generation
 		fixed js doc issues
 		refactored
 		fix compile error
 		initial add
 		first commit

