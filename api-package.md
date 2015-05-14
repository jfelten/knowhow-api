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
<dt><a href="#getAgentInfo">getAgentInfo(agentInfo, callback)</a></dt>
<dd><p>retrives agent info base on _id.</p>
</dd>
<dt><a href="#getAgentLogs">getAgentLogs(agentInfo, callback)</a></dt>
<dd><p>retrives agent info base on _id.</p>
</dd>
<dt><a href="#getAgentList">getAgentList(callback)</a></dt>
<dd><p>retrieves a list of all agents on a knowhow server</p>
</dd>
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

