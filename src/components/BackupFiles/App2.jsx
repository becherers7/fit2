import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import * as routes from '../route.js';
import Board from './Board';
import Audience from './Audience';
import Speaker from './Speaker';
import ErrorPage from './ErrorPage';
// import Router from 'react-router';
import Navbar from './Navbar';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'disconnected',
      title: '',
      member: {},
      audience: [],
      speaker: {},
    }
    this.socket = io('http://localhost:8000');
  }
  componentDidMount() {
    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
    this.joined = this.joined.bind(this);
    this.updateAudience = this.updateAudience.bind(this);
    this.emit = this.emit.bind(this);
    this.updateSpeaker = this.updateSpeaker.bind(this);

    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.updateSpeaker);
    this.welcome = this.welcome.bind(this);
    this.socket.on('welcome', this.welcome);
  }
  componentDidUpdate(){
    this.socket.on('joined', this.joined);
    this.socket.on('audience', this.updateAudience);
    this.socket.on('start', this.updateSpeaker);
  }
  emit(eventName, payload) {
    if(this.socket !== undefined){
      this.socket.emit(eventName, payload);
    }
  }
  connect() {
      //If we joined previously, set to session storage. So if we refresh page while being a member it won't get rid of member.
      let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

      if(member){
        this.socket.emit('join', member);
      }

      this.setState({status: 'connected'});
  }
  disconnect() {
      this.setState({status: 'disconnected'});
  }
  welcome(serverState) {
      this.setState({title: serverState.title});
  }
  joined(member) {
      //set our member into the session storage.
      sessionStorage.member = JSON.stringify(member);
      this.setState({member: member});
      // console.log("We've set member state: ", this.state.member);
  }
  updateAudience(newAudience){
      this.setState({audience: newAudience});
  }
  updateSpeaker(newSpeaker){
      this.setState({speaker: newSpeaker});
      console.log("our newest speaker: ", this.state.speaker);
  }

  render() {
      return (
        <Router>
          <div>
            <Navbar />
            <Header
              title={this.state.title}
              status={this.state.status}
              speaker={this.state.speaker}
            />
            <hr/>
          <Switch>
            <Route
              exact path={routes.AUDIENCEVIEW}
              component={() => <Audience status={this.state.status}
                                  member={this.state.member}
                                  emit={this.emit}
                                  audience={this.state.audience} />}
            />
            <Route
              exact path={routes.BOARDVIEW}
              component={() => <Board
                                  member={this.state.member}
                                  emit={this.emit} />}
            />
            <Route
              exact path={routes.SPEAKERVIEW}
              component={() => <Speaker
                                  member={this.state.member}
                                  emit={this.emit}
                                  status={this.state.status}/>}
            />
            <Route
              path={routes.ERRORPAGE}
              component={ErrorPage}
              />
          </Switch>

          </div>
        </Router>
    )
  }
}

export default App;
