import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Navbar from './Navbar';
import Board from './Board';
import DisplayAvailableChatRooms from './DisplayAvailableChatRooms';
import axios from 'axios';
import io from 'socket.io-client';

class App extends Component {
  constructor() {
    super()
    this.state = {
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
      loggedIn: false,
      username: null
    }
    this.socket = io('http://localhost:8000');
    // this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.updateUser = this.updateUser.bind(this)
  };

  componentDidMount() {
    this.getUser();
  };

  updateUser = (userObject) => {
    this.setState(userObject)
  };

  getUser = () => {
    axios.get('http://localhost:8000/user/').then(response => {
      console.log('Get user response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
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
  render() {
    return (
      <Router>
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {/* greet user if logged in: */}
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        {/* Routes to different components */}
        <Switch>
        <Route
          exact path="/"
          component={Board} />
        <Route
          exact path="/display/"
          render={() =>
            <DisplayAvailableChatRooms
              currentChatRoom={this.state.currentChatRoom}
              channels={this.state.channels}
              submitCreateForm={this.submitCreateForm}
              messages={this.state.messages}
              emit={this.emit}
              workouts={this.state.workouts}
              newWorkout={this.state.newWorkout}
            />}
        />
        <Route
          path="/login"
          render={() =>
            <Login
              updateUser={this.updateUser}
            />}
        />
        <Route
          path="/signup"
          render={() =>
            <Register/>}
        />
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;
