var commandMap = require('./kh-api/commandTool').getCommandMap();

var generateHelpMD = function() {
	var output = '';
	output+="# Command Tool Functions\n";
	output+="\n";
	var commands = Object.keys(commandMap)
	commands.forEach(function(key, index, ar) {
		output+="###"+key+": "+commandMap[key].description+"\n";
		output+="\t\t"+commandMap[key].usage+"\n";
		output+="\n";
	});
	console.log(output);
	var fileName = "KHCommand.md";
	var fs = require('fs');
	fs.writeFile(fileName, output, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	
	    console.log("saved as: "+fileName);
}); 

}

generateHelpMD();