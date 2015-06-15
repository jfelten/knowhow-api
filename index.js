

/**
 * Factory method for a KHClieent
 * This is a programatic representation of a knowhow server.  It provides the same functionality that the knowhow
 * server UI does.
 *
 * @param serverURL - the knwohow server being manipulated
 */
function KHClient(serverURL) {
	var self = this;
	console.log(serverURL);
	self.serverURL = serverURL;
	self.khEventHandler = new require('./kh-api/kh-events-handler')(serverURL);
	self.khRepository = require('./kh-api/kh-repository')(serverURL, self.khEventHandler);
	self.khJob = require('./kh-api/kh-job')(serverURL, self.khEventHandler,self);
	self.khAgent = new require('./kh-api/kh-agent')(serverURL, self.khEventHandler);
	self.khWorkflow = require('./kh-api/kh-workflow')(serverURL, self.khEventHandler,self);
	
	self.end = function() {
		console.log("ending KH client to: "+serverURL);
		self.khEventHandler.removeAllListeners();
		self.khEventHandler.close();
		self.khEventHandler.disconnect();
	}
	return self;
	
}

module.exports = KHClient;
