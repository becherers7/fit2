import io from 'socket.io-client';
import { 
	CREATE_CHANNEL, 
	SEND_CHANNEL_MESSAGE, 
	UPDATE_CHANNEL,
	CREATE_DIRECT_MESSAGE,
	SEND_DIRECT_MESSAGE,
	UPDATE_DIRECT_MESSAGE,
	CREATE_WORKOUT,
	SHARE_WORKOUT,
	UPDATE_WORKOUTS
} from './socketEvents';

export default function() {
	const socket = io.connect('http://localhost:8000');
	console.log("socket test 0: ", socket);
	function emitToServer (eventName, payload) {
		console.log("socket test 1: ", socket);
		console.log("emit to server function");
	    if(socket !== undefined){
			console.log("eventName: ", eventName);
			console.log("payload: ", payload);
			// check that it's a valid event name option.
			switch (eventName) {
				
				case CREATE_CHANNEL:
				socket.emit(eventName, payload);
				break;
				
				case SEND_CHANNEL_MESSAGE:
				socket.emit(eventName, payload);
				break;
				
				case CREATE_DIRECT_MESSAGE:
				socket.emit(eventName, payload);
				break;
				
				case SEND_DIRECT_MESSAGE:
				socket.emit(eventName, payload);
				break;
				
				case CREATE_WORKOUT:
				socket.emit(eventName, payload);
				
				case SHARE_WORKOUT:
				this.socket.emit(eventName, payload);

				default:
				return null;
			}
    	}
  	}

  	function listenOnServer (eventName, payload) {
  		if(socket !== undefined) {
  			console.log("listenOnServer: ", eventName);
  			// check that it's a valid event name option
	  		switch (eventName) {
	  			
	  			case UPDATE_CHANNEL:
	  			socket.on(UPDATE_CHANNEL, payload);
	  			break;
	  			
	  			case UPDATE_DIRECT_MESSAGES:
	  			socket.on(UPDATE_DIRECT_MESSAGES, payload);
	  			break;
	  			
	  			case UPDATE_WORKOUTS:
	  			socket.on(UPDATE_WORKOUTS, payload);
	  			break;
	  			
	  			default:
	  			return null;
	  		}
  		}
  	}

  	function unregisterHandler (eventName) {
  		if(socket !== undefined) {
  			console.log("unregisterHandler");
  			// check that it's a valid event name option
	  		switch (eventName) {
	  			
	  			case UPDATE_CHANNEL:
	  			socket.off(UPDATE_CHANNEL);
	  			break;
	  			
	  			case UPDATE_DIRECT_MESSAGES:
	  			socket.off(UPDATE_DIRECT_MESSAGES);
	  			break;
	  			
	  			case UPDATE_WORKOUTS:
	  			socket.off(UPDATE_WORKOUTS);
	  			break;
	  			
	  			default:
	  			return null;
	  		}
  		}
  	}

	return {
		emitToServer,
		listenOnServer,
		unregisterHandler,
	}
}