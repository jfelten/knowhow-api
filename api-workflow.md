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

