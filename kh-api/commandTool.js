


var getCommandMap = function(khClient) {

	if (!khClient) {
		khClient = {
			khAgent: {},
			khRepository: {},
			khJob: {},
			khWorkflow: {}
		}
	}
	var commandMap = {
		"help": {
			"func": help,
			"usage": "KHCommand <sub_command> <args1..N>",
			"description": "help command to list all functions"
		},
		"addAgent": {
			"func": khClient.khAgent.addAgent,
			"usage": "KHCommand addAgent <KHServerURL> <agent.json>",
			"description" : "adds agent specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"deleteAgent": {
			"func": khClient.khAgent.deleteAgent,
			"usage": "KHCommand deleteAgent <KHServerURL> <agent.json>",
			"description" : "deletes agent specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"resetAgent": {
			"func": khClient.khAgent.resetAgent,
			"usage": "KHCommand restAgent <KHServerURL> <agent.json>",
			"description" : "stops/restarts an agent specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"updateAgent": {
			"func": khClient.khAgent.updateAgent,
			"usage": "KHCommand updateAgent <KHServerURL> <agent.json>",
			"description": "updates agent specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"getAgentInfo": {
			"func": khClient.khAgent.getAgentInfo,
			"usage": "KHCommand getAgentInfo <KHServerURL> <agent.json>",
			"description": "updates agent specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"listAgents":  {
			"func": khClient.khAgent.getAgentList,
			"usage": "KHCommand listAgents <KHServerURL>",
			"description": "lists all agents on a KH server specified bu <KHServerURL>"
		},
		"getAgentLogs": {
			"func": khClient.khAgent.getAgentLogs,
			"usage": "KHCommand getAgentLogs <KHServerURL> <agent.json>",
			"description": "gets agent logs specified in <agent.json> from KH Server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"listRepositories": {
		 	"func": khClient.khRepository.listRepositories,
		 	"usage": "KHCommand listRepositories <KHServerURL>",
			"description": "lists repositories on the knowhow server at <KHServerURL>"
		 },
		"addRepo" : {
			"func" : khClient.khRepository.addRepo,
			"usage": "KHCommand addRepo <KHServerURL> <repo.json>",
			"description": "adds a repository specifified in <repo.json> on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"updateRepo" : {
			"func": khClient.khRepository.updateRepo,
			"usage": "KHCommand updateRepo <KHServerURL> <repo.json>",
			"description": "updates repository specifified in <repo.json> on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"deleteRepo" : {
			"func": khClient.khRepository.deleteRepo,
			"usage": "KHCommand deleteRepo <KHServerURL> <repo.json>",
			"description": "deletes a repository specifified in <repo.json> on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"loadRepo" : { 
			"func" : khClient.khRepository.loadRepo,
			"usage": "KHCommand loadRepo <KHServerURL> <repo.json>",
			"description": "loads a repository specifified in <repo.json> on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"loadRepoFromName" : {
			"func": khClient.khRepository.loadRepoFromName,
			"usage": "KHCommand loadRepoFromName <KHServerURL> <repo.json>",
			"description": "loads a repository based on repoName specifified in <repo.json> on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			} 
		},
		"loadFile" : {
			"func": khClient.khRepository.loadFile,
			"usage": "KHCommand loadFile <KHServerURL> <fileURL>",
			"description": "loads fileContent as a string on the knowhow server at <KHServerURL>"
		},
		"addFile" : {
			"func": khClient.khRepository.addFile,
			"usage": "KHCommand addFile <KHServerURL> <fileURL> <Contents>",
			"description": "adds a file with content <contents> to location <fileURL> on the knowhow server at <KHServerURL>"
		}, 
		"deleteFile" : {
			"func": khClient.khRepository.deleteFile,
			"usage": "KHCommand addFile <KHServerURL> <fileURL>",
			"description": "deletes a file at repository location <fileURL> on the knowhow server at <KHServerURL>"
		},
		"saveFile" : {
			"func": khClient.khRepository.saveFile,
			"usage": "KHCommand saveFile <KHServerURL> <content>",
			"description": "saves a file with content <content> at repository location <fileURL> on the knowhow server at <KHServerURL>"
		},
		"loadURL" : {
			"func": khClient.khRepository.loadURL,
			"usage": "KHCommand saveFile <KHServerURL> <a knowhow URL>",
			"description": "returns the content of any text file based on a knowhow url"
		},
		"importFileRepositoryFromGit" : {
			"func": khClient.khRepository.importFileRepositoryFromGit,
			"usage": "KHCommand importFileRepositoryFromGit <KHServerURL> <new repo json representation> <gitURL> <gitUser> <gitPassword>",
			"description": "imports a knowhow repository into a server based on a git URL"
		},
		"importFileRepositoryFromServer" : {
			"func": khClient.khRepository.importFileRepositoryFromServer,
			"usage": "KHCommand importFileRepositoryFromServer <KHServerURL> <new repo json representation> <KHHostRepoName> <serverHost> <port>",
			"description": "imports a knowhow repository into a server based on a git URL"
		},
		"importFileRepositoryFromTarBall" : {
			"func": khClient.khRepository.importFileRepositoryFromTarBall,
			"usage": "KHCommand importFileRepositoryFromTarBall <KHServerURL> <new repo json representation> <archive path>",
			"description": "imports a knowhow repository into a server from a .tar.gz archive"
		},
		"downloadRepoAsTarBall" : {
			"func": khClient.khRepository.downloadRepoAsTarBall,
			"usage": "KHCommand downloadRepoAsTarBall <KHServerURL> <new repo json representation> <save path>",
			"description": "downloads a knowhow repository from a server and saves to path as .tar.gz archive"
		},
		"executeJob" : {
			"func": khClient.khJob.executeJob,
			"usage": "KHCommand executeJob <KHServerURL> <agent.json> <job.json >",
			"description": "executes a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				console.log("agent="+args[0]);
				console.log("job="+args[1]);
				args[0] = JSON.parse(args[0]);
				args[1] = JSON.parse(args[1]);
				return args;
			}
		},
		"cancelJob" : {
			"func": khClient.khJob.cancelJob,
			"usage": "KHCommand cancelJob <KHServerURL> <agent.json> <job.json>",
			"description": "cancels a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				args[1] = JSON.parse(args[1]);
				return args;
			} 
			
		},
		"getRunningJobsList" : {
			"func": khClient.khJob.getRunningJobsList,
			"usage": "KHCommand getRunningJobsList <KHServerURL>",
			"description": "gets a running list of jobs on the knowhow server at <KHServerURL>"
			
		}, 
		"loadAgentsForEnvironment" : {
			"func": khClient.khWorkflow.loadAgentsForEnvironment,
			"usage": "KHCommand loadAgentsForEnvironment <KHServerURL> <environment.json>",
			"description": "ensures all agents for environment are running on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			}
		},
		"connectEnvironmentAgents" : {
			"func": khClient.khWorkflow.connectEnvironmentAgents,
			"usage": "KHCommand connectEnvironmentAgents <KHServerURL> <environment.json>",
			"description": "ensures all agents for environment are running on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				return args;
			}
		},
		"executeWorkflow" : {
			"func": khClient.khWorkflow.executeWorkflow,
			"usage": "KHCommand executeWorkflow <KHServerURL> <environment.json>, <workflow.json>",
			"description": "executes a workflow against an environment on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				args[1] = JSON.parse(args[1]);
				return args;
			}
		},
		"cancelWorkflow" : {
			"func": khClient.khWorkflow.cancelWorkflow,
			"usage": "KHCommand ecancelWorkflow <KHServerURL> <environment.json>, <workflow.json>",
			"description": "cancels the specified workflow running against environment on the knowhow server at <KHServerURL>",
			"processArgs": function (args) {
				args[0] = JSON.parse(args[0]);
				args[1] = JSON.parse(args[1]);
				return args;
			}
		},
		"getRunningWorksList" : {
			"func": khClient.khWorkflow.getRunningWorkflowsList,
			"usage": "KHCommand getRunningWorkflowsList <KHServerURL>",
			"description": "gets a running list of workflows on the knowhow server at <KHServerURL>"
			
		}
	}
	return commandMap;
}

exports.getCommandMap = getCommandMap;

var execute = function(command, serverURL, arguments) {
	
	console.log("executing: "+command+" on "+serverURL);
	var khClient =  require('../../knowhow-api')(serverURL);
	var commandMap = getCommandMap(khClient);
	var cmd = commandMap[command];
	if (!cmd) {
		console.log("unknown command: "+command);
		help(commandMap, commandMap['help'], undefined);
		khClient.end();
		process.exit(code=0);
		return;
	}
	
	//validate the number of arugments
	if (command == 'help') {
		cmd.func.apply(null, arguments);
		khClient.end();
		process.exit(code=0);
	}
	else if (cmd.func.length-1 != arguments.length) {
		console.error("expecting: "+cmd.func.length-1);
		improperUsage(cmd);
		khClient.end();
		process.exit(code=0);
	} else {
		if (cmd.processArgs) {
			arguments = cmd.processArgs(arguments);
		}
		//execute the command
		try {
			arguments.push(function(err,result) {
				if (err) {
					console.log("KHCommand error!");
					console.error(err.message);
					console.error(err.stack);
					khClient.end();
					process.exit(1);
				} else {
					console.log("KHCommand sucess!");
					console.log(result);
					khClient.end();
					process.exit(0);
				}
				
				
			});
		} catch (err) {
			console.error(err.message);
			khClient.end();
			process.exit(1);
		}
		cmd.func.apply(null,arguments); 
	}
	
	
}

var wrongNumberOfArgs = function(command) {

}

var improperUsage = function(command) {
	console.log("invalid number of arguments: "+command.usage);

} 

var help = function(commandMap, command, subcommand) {
	if (subcommand) {
		var subCmd = commandMap[subcommand];
		console.log(subCmd.description);
		console.log("usage: "+subCmd.usage)
		return
	}
	console.log(command.usage);
	console.log("-------------------------------------------");
	var commands = Object.keys(commandMap)
		commands.forEach(function(key, index, ar) {
			console.log(key+"\t\t\t"+commandMap[key].description);
	});
		

}

var generateHelpMD = function() {
	console.log("# Command Tool Functions");
	console.log("\n");
	var commands = Object.keys(commandMap)
		commands.forEach(function(key, index, ar) {
			console.log("###"+key+": "+commandMap[key].description+"\n");
			console.log("\t\t"+commandMap[key].usage+"\n");
			console.log("\n");
	});

}
exports.generateHelpMD = generateHelpMD

/*
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});*/

if (process.argv.length <3) {
	console.log("no command given");
	var commandMap = getCommandMap();
	help(commandMap, commandMap['help']);
} else {

	var command = process.argv[2];
	var serverURL = process.argv[3];
	var arguments = process.argv.slice(4);
	
	execute(command, serverURL, arguments); 
}
