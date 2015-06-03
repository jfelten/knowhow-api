
var testServerPort = 3002

var testRepo = {
	name: 'KHTestRepo',
	path: '/tmp/testRepo'
}

var testJob = {
	"id": "testJob",
	"script": {
		"commands": [
			{
				"command" : "echo 'hello world'"
			}
		]
	}
};

//start up a knowhow server to test against
require('../../knowhow-server/server.js')(testServerPort, function(err) {
	console.log("server started");
	var khClient = require("../index.js")("http://localhost:"+testServerPort);

	//make sure we can list repositories
	khClient.khRepository.listRepositories(function(err, repos) {
	  	if (err) {
	  		console.log("unable to get repositories: "+err.message);
			console.log(err.stack);
			callback(err);
			process.exit(1);
	  	}
	  	console.log(repos);
	});
	
	//delete any artifacts from previous tests using the load and delete calls
	khClient.khRepository.loadRepoFromName(testRepo.name, function(err, loadedRepo) {
		if (err) {
			console.log("assuming "+testRepo.name+" not yet created.");
		}
		if (loadedRepo) {
			testRepo = loadedRepo;
		}
		console.log(testRepo);
	
		//test by creating a new Repo, exporting to a tarball and reimporting it	
		khClient.khRepository.deleteRepo(testRepo, function(err,newRepo) {
			if (err) {
				console.log(err);
			}
			khClient.khRepository.addRepo(testRepo, function(err,newRepo) {
				if (err) {
					console.error(err.stack);
					process.exit(1);
				} else {
					console.log(newRepo.name+" added at path: "+newRepo.path);
					
					//add a file
					var path= "/jobs";
					var jobName = "testJob.json"
					khClient.khRepository.addFile(newRepo.path+path, jobName, JSON.stringify(testJob), false, function (err, path) {
						if (err) {
							khClient.khRepository.saveFile(newRepo.path+path, JSON.stringify(testJob), function(saveError) {
								if (saveError) {
									console.error(saveError.stack);
									throw saveError;
								} else {
									throw err;
									process.exit(1);
								}
							})
							
						} else {
							console.log(path+" added to: "+newRepo.name);
							
							//now try export the repo as a tarball
							khClient.khRepository.downloadRepoAsTarBall(newRepo, './testRepo.tar.gz', function(err, savedPath) {
								if (err) {
									throw err;
									process.exit(1);
								}
								else {
									console.log("repo tarball downloaded. now let's reimport it");
									var importRepo = {
										"name": "importedRepo",
										"path": "/tmp/importedRepoDir"
									}
									//great we can export - but can we import?
									//test by creating a new Repo, exporting to a tarbal and reimporting it	
									khClient.khRepository.deleteRepo(importRepo, function(err,delRepo) {
										if (err) {
											console.log(err);
										}
										khClient.khRepository.importFileRepositoryFromTarBall(importRepo,savedPath,function(err, importedRepo) {
											if (err) {
												throw err;
												process.exit(1);
											} else {
												console.log("sucessfully reimported tarball!");
												//it worked - so let's get rid of it
												khClient.khRepository.deleteRepo(importRepo, function(err,delRepo) {console.log("imported repo removed"); process.exit(0);});
											}
										});
									});
								}
							} );
							
						}
					});
					
					
				}
				
			
			});
		});
	});
});