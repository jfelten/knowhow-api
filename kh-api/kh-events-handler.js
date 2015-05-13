


var KHServerSocket;
var eventTypes = [ 'agent-update', 'agent-error', 'agent-delete', 'agent-add', 
					'job-start','job-update','job-cancel','job-complete','job-error',
					'cancel-job-on-agent','execution-complete','execution-error'];
					

//My module
function KHEventHandler(serverURL) {
	var self = this;
	self.KHServerSocket = require('socket.io-client')(serverURL);
	self.KHServerSocket.open();
	//listenForAllEvents(this.KHServerSocket,self);
	console.log("listening for events on: "+serverURL);
	
	self.on = function(type, func) {
		self.KHServerSocket.on(type, func);
		return this;
	};
	
	self.removeAllListeners = function() {
		self.KHServerSocket.removeAllListeners();
		return this;
	};
	
	self.disconnect = function() {
		self.KHServerSocket.disconnect();
	};
	self.close = function() {
		self.KHServerSocket.removeAllListeners();
		self.KHServerSocket.close();
		console.log("closed event socket to: "+serverURL);
	};
	
	return self;
	
}

KHEventHandler.prototype.addListener =
	KHEventHandler.prototype.on = function(type, func) {
		this.KHServerSocket.on(type, func);
		return this;
	};
	
KHEventHandler.prototype.removeListener =
	KHEventHandler.prototype.removeListener = function(type, func) {
		this.KHServerSocket.removeListener(type, func);
		return this;
	};

KHEventHandler.prototype.serverSocket = KHServerSocket;
KHEventHandler.prototype.eventTypes = eventTypes;
module.exports = KHEventHandler;