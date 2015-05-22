var request = require('request');

var inProgressAdds = {};
var inProgressDeletes = {};

/**
 * Lists all repositories on a server
 * @param serverURL
 * @param callback - function to call when done with parameters (error, repoList)
 */
var listRepositories = function(callback) {
  
  //console.log(callback);
  request.get(this.serverURL+'/repo/listRepositories',
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	        	if (!error) {
	        		callback(new Error("response: "+response.statusCode+" "+response+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	try {
			        var jsonObject = JSON.parse(body);
            	  	if (jsonObject == undefined) {
            	  		jsonObject = {};
            	  	}
		           	callback(undefined, jsonObject);
		         } catch(err) {
		         	callback(err);
		         }
		        
		    }
	    }
	);
      
};

/**
 * loads a populated repo json object based on a name
 *
 * @param repoName - the name of the repositry
 * @param callback - callback function to execute when complete with parameters (error, repoObject)
 */
var loadRepoFromName = function(repoName, callback) {
	request.get(this.serverURL+'/repo/getRepoFromName?repoName='+repoName,
    function (error, response, body) {

        if (error || response.statusCode != 200) {
        	console.error("error!!!");
            if (!error) {
    			callback(new Error("response: "+response.statusCode+" "+body)); 
        	} else {
            	callback(error);
            }
        } else {
        	//console.log(body);
	        var jsonObject = JSON.parse(body);
	        	  if (jsonObject == undefined) {
	        	  	jsonObject = {};
	        	  }
	        callback(undefined, jsonObject);
	    }
	    console.log("load repo complete!!!");
    }
 );
	
}


/**
 * Adds a new repository to a knowhow server specified by param serverUDL
 *
 * @param newRepo - A json object describing the new repository with parameters (error, repoObject)
 */
var addRepo = function(newRepo, callback) {
	var data = {
	    	newRepo: newRepo,
	    };
	//console.log(data);
	request.post(this.serverURL+'/repo/newFileRepo', {form: data},
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	try {
			        var jsonObject = JSON.parse(body);
            	  	if (jsonObject == undefined) {
            	  		jsonObject = {};
            	  	}
		           	callback(undefined, jsonObject);
		         } catch(err) {
		         	callback(err);
		         }
	        }
	    }
	);
};
    
/**
 * Modifies an existing repo obejct on a knowhow server with the values specified in the repo object
 *
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param existingRepo - a json object describing a repository - _id must be specified
 * @param callback - callback functions with parameters (error, modifiedRepoObject)
 */    
var updateRepo = function(existingRepo,callback) {
	var data = {
	    	existingRepo: existingRepo,
	    };
	    
	 request.post(this.serverURL+'/repo/updateFileRepo',data,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	callback();
	        }
	    }
	);
};

/**
 * Deletes a repository on a knowhow server
 *
 * @param repo - a json object representing the repo to delete - _id must be specified
 * @param callback - callback function with parameters (error, deletedRepo)
 */
var deleteRepo = function(repo,callback) {
	console.log("deleting repo: "+repo._id);
	var data = {
	    	repo: repo,
	    };
	request.post(this.serverURL+'/repo/deleteFileRepo',data,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
	        	callback();
	        }
	    }
	);
};

/**
 * Returns a directory tree structure starting at a specified subDir- used to load a tree widget
 * 
 * @param repo - a json object representing a repository to use
 * @param subDir - the point in the repository to start - ex: /jobs
 * @param callback callback function with params (error, repoTree)
 */
var loadRepo = function(repo, subDir, callback) {
	var dirPath = '/api/fileListForDir?dir='+repo.path;
	if (subDir)  dirPath= dirPath+'/'+subDir
    request.get(this.serverURL+dirPath,
	    function (error, response, body) {
	    	
	        if (error || response.statusCode != 200) {
	        	
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	        		console.log(error.stack);
	            	callback(error);
	            }
	        } else {
	        	//console.log(body);
		        var jsonObject = JSON.parse(body);
	            	  if (jsonObject == undefined) {
	            	  	jsonObject = {};
	            	  }
		        callback(undefined, jsonObject);
		   }
	    }
	);
	    
};


/**
 * Loads a File from the specified repository
 * 
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param repo - a json object representing a repository to use
 * @param path - the repository path of the file - ex: /jobs/myJob.json
 * @callback - callback function with parameters (error, fileContent)
 */	  
var loadFile = function(repo, path, callback) {
  	  console.log('load file');
	  
       request.get(this.serverURL+'/api/fileContent?repo='+repo+'&file='+path,
		    function (error, response, body) {
		        if (error || response.statusCode != 200) {
		            if (!error) {
	        			callback(new Error("response: "+response.statusCode+" "+body)); 
		        	} else {
		            	callback(error);
		            }
		        } else {
			        var jsonObject = JSON.parse(body);
	                	  if (jsonObject == undefined) {
	                	  	jsonObject = {};
	                	  }
			        callback(undefined, jsonObject);
			    }
		    }
		);
      
 };
 

/**
 * Adds a file to specified repository
 *
 * @param path - the repository path of the file - ex: /jobs/myJob.json
 * @param newFile - new file name 
 * @param content - text content of the file to add
 * @param isDirectory - flag for whether of not file is a directory
 * @param callback - callback function with parameters (error, newFile)
 */
var addFile = function(path, newFile, content, isDirectory, callback) {
  
      
  request.get(this.serverURL+'/api/addFile?path='+path+'&fileName='+newFile+'&isDirectory='+isDirectory+'&isEncoded=true&content='+encodeURIComponent(content),
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	        	if (!error) {
	        		console.error("error saving "+path+"/"+newFile+" status code ="+response.statusCode+" ");
	        		console.error(body);
	        		callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	        		console.error(error.message);
	        		console.error(error.stack);
	            	callback(error);
	            }
	        } else {
	        	try {
			        var jsonObject = JSON.parse(body);
            	  	if (jsonObject == undefined) {
            	  		jsonObject = {};
            	  	}
		           	callback(undefined, jsonObject);
		         } catch(err) {
		         	callback(err);
		         }
		        
		    }
	    }
	);
      
};
  

/**
 * Deletes specified file from a repository
 * 
 * @param filePath - the absolute directory structure of the file to delete ex /myRepo/job/myJob.json
 * @param force
 * @param callback - callback function with parameters (error, deletedFile)
 */
var deleteFile = function(filePath, force, callback) {
 request.get(this.serverURL+'/api/deleteFile?fileName='+filePath,
    function (error, response, body) {
        if (error || response.statusCode != 200) {
            if (!error) {
    			callback(new Error("response: "+response.statusCode+" "+body)); 
        	} else {
            	callback(error);
            }
        } else {
	        var jsonObject = response;
	        	  if (jsonObject == undefined) {
	        	  	jsonObject = {};
	        	  }
	        callback(undefined, jsonObject);
	    }
    }
 );
			  
};

/**
 * saves a file	in the specified filePAth on a knowhow server
 *
 * @param filePath - the absolute directory path of a specified file on the knowhow server host
 * @param fileContent - the text content of the file
 * @param callback - callbacj function with params (error, file)
 */   
var saveFile =  function(filePath,fileContent,callback) {
	console.log(fileContent);
	console.log(encodeURIComponent(JSON.stringify(fileContent)));
	 var saveURL = this.serverURL+'/api/saveFile?fileName='+encodeURIComponent(filePath)+'&isEncoded=false&data='+encodeURIComponent(fileContent);
	 console.log(saveURL);
	 request.get(saveURL ,
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	           if (!error) {
	    			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	            	callback(error);
	            }
	        } else {
		        var jsonObject = JSON.parse(body);
	        	if (jsonObject == undefined) {
	        	  	jsonObject = {};
	        	}
		        callback(undefined, jsonObject);
		    }
	    }
	 );
	  
};

/**
 * Factory method for KHJob
 * @param serverURL the url of the server
 * @param EventHandler
 */
function KHRepository(serverURL, khEventHandler){
	self=this;
	self.serverURL = serverURL;
	self.khEventHandler = khEventHandler;
	
	self.listRepositories = listRepositories.bind({serverURL: serverURL});
	self.addRepo = addRepo.bind({serverURL: serverURL});
	self.updateRepo = updateRepo.bind({serverURL: serverURL});
	self.deleteRepo = deleteRepo.bind({serverURL: serverURL});
	self.loadRepo = loadRepo.bind({serverURL: serverURL});
	self.loadRepoFromName = loadRepoFromName.bind({serverURL: serverURL});
	self.loadFile = loadFile.bind({serverURL: serverURL});
	self.addFile = addFile.bind({serverURL: serverURL});
	self.deleteFile = deleteFile.bind({serverURL: serverURL});
	self.saveFile = saveFile.bind({serverURL: serverURL});
	
	
	return self;
}
module.exports = KHRepository;


exports.listRepositories = listRepositories;
exports.addRepo = addRepo;
exports.updateRepo = updateRepo;
exports.deleteRepo = deleteRepo;
exports.loadRepo = loadRepo;
exports.loadRepoFromName = loadRepoFromName;
exports.loadFile = loadFile;
exports.addFile = addFile;
exports.deleteFile = deleteFile;
exports.saveFile = saveFile;

