import io from 'socket.io-client';

//refactor this modules file to handle socket functions.
let instance;
let creating;


// I need to create a new instance of sockets.
// I need to 
// export default function () {
//   function message (message)
// }
class Sockets {
	constructor() {
		this.socket = io('http://localhost:8000');
		this.emit.bind(this);
    this.updateMessages.bind(this);
    this.updateChannels.bind(this);
    this.updateWorkouts.bind(this);
    console.log('this.socket: ', this.socket);
	}
  static getInstance () {
    if(!instance) {
      creating = true;
      instance = new Sockets();
      creating = false;
    }
    return instance;
  }
	
  emit (eventName, payload) {
    console.log("our socket: ", this.socket);
    if(this.socket !== undefined){
      console.log("eventName: ", eventName);
      console.log("payload: ", payload);
      this.socket.emit(eventName, payload);
    }
  }

  // updateState (response) {
  //   if(response !== undefined && response !== null) {
  //     console.log('our response: ', response);
  //     return response;
  //   }
  // }
  
  // update messages from socket server emission
  updateMessages (newMessages) {
    // this.setState({messages: newMessages});
    console.log("messages incoming: ", this.state.messages);
    return newMessages;
  }
  
  // update channels from socket server emission
  updateChannels (newChannels) {
    console.log("incoming new channels: ", newChannels);
    // this.setState({channels: newChannels});
    return newChannels;
  }

  // update workouts from socket server emission
  updateWorkouts (newWorkouts) {
    console.log("incoming workouts: ", newWorkouts);
    // console.log(this.state.workouts);
    // this.setState({workouts: newWorkouts});
    return newWorkouts;
  }

  // get the existing channels.
  // getExistingChannels (channels) {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('post', 'http://localhost:8000/api/getChannels');
  //   xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  //   // set the authorization HTTP header
  //   let searchQuery = `friend=${friend}`;
  //   xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  //   xhr.responseType = 'json';
  //   xhr.addEventListener('load', () => {
  //     if (xhr.status === 200) {
  //         console.log("requesting users");
  //         let channels = xhr.response.map(el => {
  //             if(el) {
  //               let channel = {
  //                 name: el.email,
  //                 purpose: el.purpose,
  //                 roomMembers: el.roomMembers,
  //               };
  //               return email
  //             }
  //         });
  //         this.setState({suggestions: suggestions});
  //         console.log(this.state.suggestions);

  //     } else {
  //         console.log("something went wrong");
  //     }
  //   });
  //   xhr.send(searchQuery);
  // }
}

export default Sockets;
