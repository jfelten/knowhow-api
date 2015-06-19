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

