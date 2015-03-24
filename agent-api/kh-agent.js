var request = require('request');

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

exports.services = {};
