var testServerPort = 3005;

var testAgent = {
	user: "testUser",
	user: "testPassword",
	host: "localhost",
	port: 5141

}


//start up a knowhow server to test against
require('../../knowhow-server/server.js')(testServerPort, function(err) {
	console.log("server started");
	var khClient = require("../index.js")("http://localhost:"+testServerPort);
	
	khClient.khAgent.deleteAgent(testAgent, function(err, deletedAgent) {
		if (err) {
			//throw err;
		}
		khClient.khAgent.addAgent(testAgent, function(err, addedAgent) {
		
			if (err) {
				throw err;
			}
			console.log("agent added");
			console.log(addedAgent);
			khClient.khAgent.resetAgent( addedAgent, function( err, reloadedAgent) {
				if (err) {
					throw err;
				}
				//process.exit(0);
			});
		});
	});

});