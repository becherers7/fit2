import React from 'react';
import io from 'socket.io-client';
import CreateChatRoomForm from './CreateChatRoomForm';
import RoomsList from './RoomsList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DisplayAvailableChatRooms from './DisplayAvailableChatRooms';
import WorkBook from './WorkBook';
import Login from './Login';
import Register from './Register';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      test: '',
      currentChatRoom: '',
      chatRooms: [],
      channels: [],
      messages: [],
      newWorkout: {
        label: '',
        exercises: [],
        day: '',
        comments: []
      },
      workouts: [
        {
          label: 'Arm Day',
          exercises: [
            {exercise: 'bicep curls', sets: '10', reps: '3'},
            {exercise: 'tricep extensions', sets: '10', reps: '3'}
          ],
          day: 'Monday',
          comments: [
            {user: '12345', comment: 'This looks great!', createDate: '2/14/19'},
            {user: '12348', comment: 'Awesome job dude!', createDate: '2/14/19'},
          ]
        },
        {
          label: 'Leg Day',
          exercises: [
            {exercise: 'leg curls', sets: '10', reps: '3'},
            {exercise: 'leg extensions', sets: '10', reps: '3'}
          ],
          day: 'Wednesday',
          comments: [
            {user: '12345', comment: 'Leg DAY', createDate: '2/16/19'},
            {user: '12348', comment: 'Quadtrrrasaurous rex :)', createDate: '2/16/19'},
          ]
        },
      ],
    }
    this.socket = io('http://localhost:8000');
  }
    componentDidMount(){
      console.log("connected socket: ", this.socket);
      this.socket.on('updateMessages', this.updateMessages);
      this.socket.on('updateChannels', this.updateChannels);
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      console.log("prevState: ", prevState);
      //-if channels gets updated set the current chat room to the latest chat room pushed.
      if(this.state.channels.length !== prevState.channels.length){
        let channels = this.state.channels;
        let currentChatRoom = channels[channels.length-1];
        this.setState({currentChatRoom: currentChatRoom});
        console.log("test");
      }

    }
    //-if messages are updated on socket server update messages on ui.
    updateMessages =(newMessages) =>{
      this.setState({messages: newMessages});
      console.log("messages incoming: ", this.state.messages);
    }
    //-if channels are updated on socket server update channels on ui
    updateChannels = (newChannels) => {
      console.log("incoming new channels: ", newChannels);
      this.setState({channels: newChannels});
    }
    updateWorkouts = (newWorkouts) => {
      console.log("incoming workouts: ", newWorkouts);
      this.setState({workouts: newWorkouts});
      console.log(this.state.workouts);
    }
    //-we have a defined socket, use this for when we want to emit an event ui side.
    //MAKE SOMETHING SIMILAR ON SERVER SIDE.
    emit = (eventName, payload) => {
      console.log("our socket: ", this.socket);
      if(this.socket !== undefined){
        console.log("eventName: ", eventName);
        console.log("payload: ", payload);
        this.socket.emit(eventName, payload);
      }
    }
    //-on submit of a channel, emit channel room event.
    submitCreateForm = (channel) => {
      console.log("submit channel: ", channel);
      this.setState({currentChatRooms: channel});
      this.emit('channel room', channel);
    }
    submitCreateWorkoutForm = (workout) => {
      this.setState({newWorkout: workout});
      this.emit('new workout', workout);
    }

    changeCurrentChatRoomValue = (event) => {
        let currentChatRoom = event.target.value;
        this.setState({currentChatRoom: currentChatRoom});
    }

    render(){
      //-if there are no chat rooms only display create chat room form.
      return (
        <React.Fragment>
          <DisplayAvailableChatRooms
           currentChatRoom={this.state.currentChatRoom}
           channels={this.state.channels}
           submitCreateForm={this.submitCreateForm}
           messages={this.state.messages}
           emit={this.emit}
           workouts={this.state.workouts}
           newWorkout={this.state.newWorkout}  />

        </React.Fragment>
      )
    }
}


export default App;
