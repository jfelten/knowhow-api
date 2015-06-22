var testServerPort = 3006;

var testAgent = "{\\\"user\\\": \\\"johnfelten\\\",\\\"host\\\": \\\"localhost\\\", \\\"port\\\": 5141}";
//start up a knowhow server to test against
require('../../knowhow-server/server.js')(testServerPort, function(err,server) {
	
});

//wait for the server to start adn hten add an agent
//use knowhow shell to execute KHCommand
var KnowhowShell = require('../../knowhow-shell/knowhow-shell.js');
var knowhowShell = new KnowhowShell();

var serverURL = "http://localhost:"+testServerPort;
//wait for the server to start
knowhowShell.executeSingleCommand("../bin/KHCommand.sh waitForServerStartup "+serverURL, function(err, result) {
	if(err) {
		throw err;
		process.exit(1);
	}

	console.log("server started");
	//make sure there is a heartbeat
	knowhowShell.executeSingleCommand("../bin/KHCommand.sh serverHeartbeat "+serverURL, function(err, result) {
		if (err) {
			console.error(err.stack);
			console.error(result);
			process.exit(1);
		}
		console.log("server is alive: "+result.output);
		//now add an agent
		knowhowShell.executeSingleCommand("../bin/KHCommand.sh deleteAgent "+serverURL+" \""+testAgent+"\"", function(err, result) {
			knowhowShell.executeSingleCommand("../bin/KHCommand.sh addAgent "+serverURL+" \""+testAgent+"\"", function(err, result) {
				if (err) {
					console.error(err.stack);
					console.error(result);
					process.exit(1);
				}
				console.log("agent added: "+result.output);
				knowhowShell.executeSingleCommand("../bin/KHCommand.sh agentHeartbeat "+serverURL+" \""+testAgent+"\"", function(err, result) {
					
					if(err) {
						knowhowShell.executeSingleCommand("../bin/KHCommand.sh waitForAgentStartup "+serverURL+" \""+testAgent+"\"", function(err, result) {
							if(err) {
								throw err;
								process.exit(1);
							}
							knowhowShell.executeSingleCommand("../bin/KHCommand.sh resetAgent "+serverURL+" \""+testAgent+"\"", function(err, result) {
								if(err) {
									throw err;
									//process.exit(1);
								} else {
									console.log("test complete");
									process.exit(0);
								}
							});
						});
					}
					else {
						console.log("agent is running so test complete");
						process.exit(0);
					}
				});
				
			});
		});
	});

});
