
var khAgent = require('./kh-agent');
var khJob = require('./kh-job');
var khRepository = require('./kh-repository');


var commandMap = {
	"help": {
		"func": help,
		"usage": "KHCommand <sub_command> <args1..N>",
		"description": "help command to list all functions"
	},
	"addAgent": {
		"func": khAgent.addAgent,
		"usage": "KHCommand addAgent <KHServerURL> <agent.json>",
		"description" : "adds agent specified in <agent.json> from KH Server at <KHServerURL>" 
	},
	"deleteAgent": {
		"func": khAgent.deleteAgent,
		"usage": "KHCommand deleteAgent <KHServerURL> <agent.json>",
		"description" : "deletes agent specified in <agent.json> from KH Server at <KHServerURL>"
	},
	"updateAgent": {
		"func": khAgent.updateAgent,
		"usage": "KHCommand updateAgent <KHServerURL> <agent.json>",
		"description": "updates agent specified in <agent.json> from KH Server at <KHServerURL>"
	},
	"listAgents":  {
		"func": khAgent.getAgentList,
		"usage": "KHCommand listAgents <KHServerURL>",
		"description": "lists all agents on a KH server specified bu <KHServerURL>"
	},
	"getAgentLogs": {
		"func": khAgent.getAgentLogs,
		"usage": "KHCommand getAgentLogs <KHServerURL> <agent.json>",
		"description": "gets agent logs specified in <agent.json> from KH Server at <KHServerURL>"
	},
	"listRepositories": {
	 	"func": khRepository.listRepositories,
	 	"usage": "KHCommand listRepositories <KHServerURL>",
		"description": "lists repositories on the knowhow server at <KHServerURL>"
	 },
	"addRepo" : {
		"func" : khRepository.addRepo,
		"usage": "KHCommand addRepo <KHServerURL> <repo.json>",
		"description": "adds a repository specifified in <repo.json> on the knowhow server at <KHServerURL>"
	},
	"updateRepo" : {
		"func": khRepository.updateRepo,
		"usage": "KHCommand updateRepo <KHServerURL> <repo.json>",
		"description": "updates repository specifified in <repo.json> on the knowhow server at <KHServerURL>"
	},
	"deleteRepo" : {
		"func": khRepository.deleteRepo,
		"usage": "KHCommand deleteRepo <KHServerURL> <repo.json>",
		"description": "deletes a repository specifified in <repo.json> on the knowhow server at <KHServerURL>"
	},
	"loadRepo" : { 
		"func" : khRepository.loadRepo,
		"usage": "KHCommand loadRepo <KHServerURL> <repo.json>",
		"description": "loads a repository specifified in <repo.json> on the knowhow server at <KHServerURL>"
	},
	"loadRepoFromName" : {
		"func": khRepository.loadRepoFromName,
		"usage": "KHCommand loadRepoFromName <KHServerURL> <repo.json>",
		"description": "loads a repository based on repoName specifified in <repo.json> on the knowhow server at <KHServerURL>"
	},
	"loadFile" : {
		"func": khRepository.loadFile,
		"usage": "KHCommand loadFile <KHServerURL> <fileURL>",
		"description": "loads fileContent as a string on the knowhow server at <KHServerURL>"
	},
	"addFile" : {
		"func": khRepository.addFile,
		"usage": "KHCommand addFile <KHServerURL> <fileURL> <Contents>",
		"description": "adds a file with content <contents> to location <fileURL> on the knowhow server at <KHServerURL>"
	}, 
	"deleteFile" : {
		"func": khRepository.deleteFile,
		"usage": "KHCommand addFile <KHServerURL> <fileURL>",
		"description": "deletes a file at repository location <fileURL> on the knowhow server at <KHServerURL>"
	},
	"saveFile" : {
		"func": khRepository.saveFile,
		"usage": "KHCommand saveFile <KHServerURL> <content>",
		"description": "saves a file with content <content> at repository location <fileURL> on the knowhow server at <KHServerURL>"
	},
	"executeJob" : {
		"func": khJob.executeJob,
		"usage": "KHCommand cancelJob <KHServerURL> <agent.json> <job.json or jobURL>",
		"description": "executes a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>"
	},
	"cancelJob" : {
		"func": khJob.cancelJob,
		"usage": "KHCommand cancelJob <KHServerURL> <agent.json> <job.json>",
		"description": "cancels a job <repository URL or json> on a specified agent <Agent.json> through on the knowhow server at <KHServerURL>"
		
	},
	"getRunningJobsList" : {
		"func": khJob.getRunningJobsList,
		"usage": "KHCommand getRunningJobsList <KHServerURL>",
		"description": "gets a running list of jobs on the knowhow server at <KHServerURL>"
		
	}
}



var execute = function(command, arguments) {


	var cmd = commandMap[command];
	if (!cmd) {
		console.log("unknown command: "+command);
		help(commandMap['help'], undefined);
		return;
	}
	
	//validate the number of arugments
	if (command == 'help') {
		cmd.func.apply(null, arguments);
	}
	else if (cmd.func.length-1 != arguments.length) {
		console.error("expecting: "+cmd.func.length-1);
		improperUsage(cmd);
	} else {
		//execute the command
		arguments.push(function(err,result) {
			if (err) {
				console.error(err.message);
			} else {
				console.log(result);
			}
			console.log("complete!");
		});
		cmd.func.apply(null, arguments);
	}
	
}

var wrongNumberOfArgs = function(command) {

}

var improperUsage = function(command) {
	console.log("invalid number of arguments: "+command.usage);

} 

var help = function(command, subcommand) {
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

/*
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});*/

if (process.argv.length <3) {
	console.log("no command given");
	help(commandMap['help']);
} else {

	var command = process.argv[2];
	var arguments = process.argv.slice(3);
	
	execute(command, arguments); 
}
