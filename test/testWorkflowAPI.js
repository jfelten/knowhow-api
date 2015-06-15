
var testServerPort = 3004;

var exampleRepo = {
	"name": "knowhow-example",
	"path": "/tmp/knowhow-example"
};


//start up a knowhow server to test against
require('../../knowhow-server/server.js')(testServerPort, function(err,server) {

	if (err) {
		throw err;
		prcoess.exit(1);
	}
	console.log("server started");
	var khClient = require("../index.js")("http://localhost:"+testServerPort);
	
	//import the example repository to laod the test workflows
	//delete any exiting test artifacts just in case
	khClient.khRepository.deleteRepo(exampleRepo,function(err,delRepo) {
	
		//import the knowhow_example repo from git
		var gitURL = "https://github.com/jfelten/knowhow_example_repo.git";
		var gitUser = undefined;
		var gitPassword = undefined;
		khClient.khRepository.importFileRepositoryFromGit(exampleRepo, gitURL, gitUser, gitPassword, function(err, loadedRepo) {
			//imported repo - so let's run the test workflow against a test environment
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
					khClient.khRepository.loadURL("knowhow-example:///workflows/test/testWorkflow.json", function(err, testWorkflow) {
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
			
			
		});
	
	});
	
});