

//server API
var khServerRepoServices = require('./server-api/kh-repository').services;
var khServerJobservices = require('./server-api/kh-job').services;
var khServerWorkflowServices = require('./server-api/kh-workflow').services;

//agent API
var khAgentServices = require('./agent-api/kh-agent').services;

var services = {};
var addServ

var executeCall = function(APICall, params) {
	var paramString = '';
	
	services[APICall].apply(uri,params);

}

exports.executeAPICall = executeCall;
	
