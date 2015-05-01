# Command Tool Functions

###help: help command to list all functions
		KHCommand <sub_command> <args1..N>

###addAgent: adds agent specified in <agent.json> from KH Server at <KHServerURL>
		KHCommand addAgent <KHServerURL> <agent.json>

###deleteAgent: deletes agent specified in <agent.json> from KH Server at <KHServerURL>
		KHCommand deleteAgent <KHServerURL> <agent.json>

###updateAgent: updates agent specified in <agent.json> from KH Server at <KHServerURL>
		KHCommand updateAgent <KHServerURL> <agent.json>

###listAgents: lists all agents on a KH server specified bu <KHServerURL>
		KHCommand listAgents <KHServerURL>

###getAgentLogs: gets agent logs specified in <agent.json> from KH Server at <KHServerURL>
		KHCommand getAgentLogs <KHServerURL> <agent.json>

###listRepositories: lists repositories on the knowhow server at <KHServerURL>
		KHCommand listRepositories <KHServerURL>

###addRepo: adds a repository specifified in <repo.json> on the knowhow server at <KHServerURL>
		KHCommand addRepo <KHServerURL> <repo.json>

###updateRepo: updates repository specifified in <repo.json> on the knowhow server at <KHServerURL>
		KHCommand updateRepo <KHServerURL> <repo.json>

###deleteRepo: deletes a repository specifified in <repo.json> on the knowhow server at <KHServerURL>
		KHCommand deleteRepo <KHServerURL> <repo.json>

###loadRepo: loads a repository specifified in <repo.json> on the knowhow server at <KHServerURL>
		KHCommand loadRepo <KHServerURL> <repo.json>

###loadRepoFromName: loads a repository based on repoName specifified in <repo.json> on the knowhow server at <KHServerURL>
		KHCommand loadRepoFromName <KHServerURL> <repo.json>

###loadFile: loads fileContent as a string on the knowhow server at <KHServerURL>
		KHCommand loadFile <KHServerURL> <fileURL>

###addFile: adds a file with content <contents> to location <fileURL> on the knowhow server at <KHServerURL>
		KHCommand addFile <KHServerURL> <fileURL> <Contents>

###deleteFile: deletes a file at repository location <fileURL> on the knowhow server at <KHServerURL>
		KHCommand addFile <KHServerURL> <fileURL>

###saveFile: saves a file with content <content> at repository location <fileURL> on the knowhow server at <KHServerURL>
		KHCommand saveFile <KHServerURL> <content>

###executeJob: executes a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>
		KHCommand cancelJob <KHServerURL> <agent.json> <job.json or jobURL>

###cancelJob: cancels a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>
		KHCommand cancelJob <KHServerURL> <agent.json> <job.json>

###getRunningJobsList: gets a running list of jobs on the knowhow server at <KHServerURL>
		KHCommand getRunningJobsList <KHServerURL>

