const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}

// initialize object
const myEmitter = new MyEmitter();

// event listener
myEmitter.on('event', () => {
    console.log('Event Fired...');
});

// emit event
myEmitter.emit('event');