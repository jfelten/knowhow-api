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

