var testServerPort = 3003;
var exampleRepo = {
	"name": "knowhow_example",
	"path": "/tmp/knowhow_example"
};

var exampleRepo2 = {
	"name": "knowhow_example2",
	"path": "/tmp/knowhow_example2"
};

//start up a knowhow server to test against
require('../../knowhow-server/server.js')(testServerPort, function(err) {
	console.log("server started");
	var khClient = require("../index.js")("http://localhost:"+testServerPort);
	//delete any exiting test artifacts just in case
	khClient.khRepository.deleteRepo(exampleRepo,function(err,delRepo) {
	
		//let's try importing the knowhow_example repo from git
		var gitURL = "https://github.com/jfelten/knowhow_example_repo.git";
		var gitUser = undefined;
		var gitPassword = undefined;
		khClient.khRepository.importFileRepositoryFromGit(exampleRepo, gitURL, gitUser, gitPassword, function(err, loadedRepo) {
			if (err) {
				console.error(err.stack);
				throw err;
				process.exit(1);
			}
			//it worked - so let's try reloading it to verify
			khClient.khRepository.loadRepoFromName(exampleRepo.name, function(err, loadedRepo) {
				if (err) {
					throw err;
					process.exit(1);
				}
				//it worked - so now let's see if another server can import this
				
				//start up another knowhow server
				require('../../knowhow-server/server.js')(testServerPort+100, function(err) {
					if (err) {
						throw err;
						process.exit(1);
						return;
					}
					var khClient2 = require("../index.js")("http://localhost:"+(testServerPort+100));
					khClient2.khRepository.deleteRepo(exampleRepo2, function(err,delRepo) {
						var KHHostRepoName = exampleRepo.name;
						var serverHost = "localhost";
						var port = testServerPort;
						
						khClient2.khRepository.importFileRepositoryFromServer(exampleRepo2, KHHostRepoName, serverHost, port, function(err, loadedRepo) {
						
							if (err) {
								console.error(err.stack);
								throw err;
								//process.exit(1);
								return;
							} else {

								//it worked so let's delete and complete the tests
								khClient2.khRepository.deleteRepo(exampleRepo2,function(err,delRepo) {
									if (err) {
										throw err
										process.exit(1);
									}
									khClient.khRepository.deleteRepo(exampleRepo,function(err,delRepo) {
										if (err) {
											throw err
											process.exit(1);
										}
										console.log("test complete!");
										process.exit(0);
									});
								});
							}
						});
					
					});	
				});
			});
			
		});
	});
});