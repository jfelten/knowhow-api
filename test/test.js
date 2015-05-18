
//create and start a knowhow-server
var npm = require("npm");
npm.load({}, function (er) {
  if (er) return handlError(er)
  npm.commands.install(["knowhow-server"], function (er, data) {
    if (er) return commandFailed(er)
    require('knowhow-server/server.js')(3001, function(err) {
		console.log("server started");
		var khClient = require("../index.js")("http://localhost:3001");

	khClient.khRepository.listRepositories(function(err, repos) {
	  	if (err) {
	  		console.log("unable to get repositories: "+err.message);
			console.log(err.stack);
			callback(err);
			return;
	  	}
	  	console.log(repos);
	  	process.exit(0);
	});
	});
    
  })
  npm.registry.log.on("log", function (message) { 
  	//console.log(message); 
  });
})



