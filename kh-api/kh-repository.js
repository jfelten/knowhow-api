var request = require('request');



/**
 * Lists all repositories on a server
 * @param serverURL
 * @param callback - function to call when done with parameters (error, repoList)
 */
var listRepositories = function(serverURL, callback) {
  
      
  request.get(serverURL+'/repo/listRepositories',
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
 # @parma serverName - the URL of the knowhow server ex :http://localhost:3001
 * @param repoName - the name of the repositry
 * @param callback - callback function to execute when complete with parameters (error, repoObject)
 */
var loadRepoFromName = function(serverURL, repoName, callback) {
	 request.get(serverURL+'/repo/getRepoFromName?repoName='+repoName,
    function (error, response, body) {
        if (error || response.statusCode != 200) {
            if (!error) {
    			callback(new Error("response: "+response.statusCode+" "+body)); 
        	} else {
            	callback(error);
            }
        } else {
        	console.log(body);
	        var jsonObject = JSON.parse(body);
	        	  if (jsonObject == undefined) {
	        	  	jsonObject = {};
	        	  }
	        callback(undefined, jsonObject);
	    }
    }
 );
	
}


/**
 * Adds a new repository to a knowhow server specified by param serverUDL
 *
 * @param serverURL - - the URL of the knowhow server ex :http://localhost:3001
 * @param newRepo - A json object describing the new repository with parameters (error, repoObject)
 */
var addRepo = function(serverURL, newRepo, callback) {
	var data = {
	    	newRepo: newRepo,
	    };
	console.log(data);
	request.post(serverURL+'/repo/newFileRepo', {form: data},
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
var updateRepo = function(serverURL,existingRepo,callback) {
	var data = {
	    	existingRepo: existingRepo,
	    };
	    
	 request.post(serverURL+'/repo/updateFileRepo',data,
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
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param repo - a json object representing the repo to delete - _id must be specified
 * @param callback - callback function with parameters (error, deletedRepo)
 */
var deleteRepo = function(serverURL,repo,callback) {
	console.log("deleting repo: "+repo._id);
	var data = {
	    	repo: repo,
	    };
	request.post(serverURL+'/repo/deleteFileRepo',data,
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
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param repo - a json object representing a repository to use
 * @param subDir - the point in the repository to start - ex: /jobs
 * @param callback callback function with params (error, repoTree)
 */
var loadRepo = function(serverURL,repo, subDir, callback) {
	var dirPath = '/api/fileListForDir?dir='+repo.path;
	if (subDir)  dirPath= dirPath+'/'+subDir
    request.get(serverURL+dirPath,
	    function (error, response, body) {
	    	
	        if (error || response.statusCode != 200) {
	        	
	            if (!error) {
        			callback(new Error("response: "+response.statusCode+" "+body)); 
	        	} else {
	        		console.log(error.stack);
	            	callback(error);
	            }
	        } else {
	        	console.log(body);
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
var loadFile = function(serverURL,repo, path, callback) {
  	  console.log('load file');
	  
       request.get(serverURL+'/api/fileContent?repo='+repo+'&file='+path,
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
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param path - the repository path of the file - ex: /jobs/myJob.json
 * @param newFile - new file name 
 * @param content - text content of the file to add
 * @param isDirectory - flag for whether of not file is a directory
 * @param callback - callback function with parameters (error, newFile)
 */
var addFile = function(serverURL, path, newFile, content, isDirectory, callback) {
  
      
  request.get(serverURL+'/api/addFile?path='+path+'&fileName='+newFile+'&isDirectory='+isDirectory+'&isEncoded=true&content='+encodeURIComponent(content),
	    function (error, response, body) {
	        if (error || response.statusCode != 200) {
	        	if (!error) {
	        		console.log(response);
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
 * Deletes specified file from a repository
 * 
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param filePath - the absolute directory structure of the file to delete ex /myRepo/job/myJob.json
 * @param force
 * @param callback - callback function with parameters (error, deletedFile)
 */
var deleteFile = function(serverURL, filePath, force, callback) {
 request.get(encodeURIComponent(serverURL+'/api/deleteFile?fileName='+filePath),
    function (error, response, body) {
        if (error || response.statusCode != 200) {
            if (!error) {
    			callback(new Error("response: "+response.statusCode+" "+body)); 
        	} else {
            	callback(error);
            }
        } else {
	        var jsonObject = JSON.parse(response);
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
 * @param serverURL - the URL of the knowhow server ex :http://localhost:3001
 * @param filePath - the absolute directory path of a specified file on the knowhow server host
 * @param fileContent - the text content of the file
 * @param callback - callbacj function with params (error, file)
 */   
var saveFile =  function(serverURL,filePath,fileContent,callback) {
	console.log(fileContent);
	console.log(encodeURIComponent(JSON.stringify(fileContent)));
	 var saveURL = serverURL+'/api/saveFile?fileName='+filePath+'&isEncoded=true&data='+encodeURIComponent(fileContent);
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

