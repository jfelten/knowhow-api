var request = require('request');

/**
 * list all the repositories active on a knowhow-server
 * @param serverURL the server URL
 * @param callback with 2 parame
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
	        	callback();
	        }
	    }
	);
};
    
var updateRepo = function(existingRepo,callback) {
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

var loadRepo = function(serverURL,repo, subDir, callback) {

    request.get('/api/fileListForDir?dir='+repo.path+'/'+subDir,
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
	  
var loadFile = function(serverURL,repo, path, callback) {
  	  console.log('load file');
	  
       request.get('/api/fileContent?repo='+repo+'&file='+path,
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

var addFile = function(serverURL, path, repo, newFile, content, isDirectory, callback) {
  
      
  request.get(serverURL+'/api/addFile?path='+path+'&fileName='+newFile+'&isDirectory='+isDirectory+'&content='+content,
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
  

	 
	 
var deleteFile = function(serverURL, filePath, force, callback) {
 request.get(serverURL+'/api/deleteFile?fileName='+filePath,
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
	    
var saveFile =  function(serverURL,filePath,fileContent,callback) {

	 request.get(serverURL+'/api/saveFile?fileName='+filePath+'&data='+JSON.stringify(fileContent),
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

exports.services = {
	"listRepositories": {
		"fn" : listRepositories,
		"description": "list all the repositories active on a knowhow-server",
		"parameters" : {
			"serverURL" : "base URL of the KH Server - ex http://localhost:3001"
		}
	},
	"addRepo": {
		"fn": addRepo,
		"description": "Adds a new repository to a knowhow server",
		"parameters" : {
			"serverURL" : "base URL of the KH Server - ex http://localhost:3001",
			"newRepo": "The json representation of the repository object"
		}
		
	},
	"updateRepo": {
		"fn": updateRepo,
		"description": "updates a repositories values",
		"parameters": {
			"serverURL" : "base URL of the KH Server - ex http://localhost:3001",
			"repo": "The json representation of the repository object"
		 }
	},
	"deleteRepo": {
	 	"fn": deleteRepo,
	 	"description": "deletes a repository from a knowhow server",
	 	"parameters": {
	 		"serverURL" : "base URL of the KH Server - ex http://localhost:3001",
			"repo": "The json representation of the repository object" 
	 	}
	 },
	"loadRepo": {
		"fn": loadRepo,
		"description" : "loads a repository object",
		"parameters": {
		
		}
	},	
	"loadFile": {
		"fn": loadFile,
		"description": "rertieves the text contents of a file",
		"parameters": {
		
		},
		"return" 
	"addFile": addFile,
	"deleteFile": deleteFile,
	"saveFile": saveFile
}


