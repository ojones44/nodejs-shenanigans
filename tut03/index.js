const { logEvents } = require('./logEvents');
const EventEmitter = require('events');

// initilalize emitter object
const emitter = new EventEmitter();

// add listener for a log event
emitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
	// call the log event handler
	// can accept more than one argument
	emitter.emit('log', 'Testing function from emitter object');
}, 1000);

// This is how to setup a basic emitter in Node.js, to listen for and emit events.

// This can be useful for logging activity on a web server. A little bit like the npm package morgan.
