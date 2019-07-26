import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom';

{/*material-ui packages*/}
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles';


// import Home from './components/Home.jsx';
{/*modules*/}
import Auth from './modules/Auth';
import socket from './modules/socket.js';
import { UPDATE_CHANNEL } from './modules/socketEvents.js';

{/*components*/}
import Dashboard from './components/Dashboard';
import FriendProfile from './components/FriendProfile';
import AuthedNavbar from './components/Navbar/AuthedNavbar';
import NotAuthedNavbar from './components/Navbar/NotAuthedNavbar';
import Home from './components/Home';

{/*containers*/}
import Logout from './containers/AuthContainer/Logout';
import Login from './containers/AuthContainer/Login/Login';
import Register from './containers/AuthContainer/Register/Register';
import SidemenuContainer from './containers/SidemenuContainer/SidemenuContainer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      client: socket(),
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
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.authenticated !== prevState.authenticated) {
      this.toggleAuthenticateStatus();
    }
  }

  toggleAuthenticateStatus = () => {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() });
  }

  render() {
    return (
          <Router>
            <Switch>      
              {Auth.isUserAuthenticated() ? (
                <React.Fragment>
                    
                    <SidemenuContainer 
                        workouts={this.state.workouts}
                        emitToServer={this.state.client.emitToServer}
                        listenOnServer={this.state.client.listenOnServer}
                        unregisterHandler={this.state.client.unregisterHandler} 
                    />
 
                    <Route
                      exact path="/friend"
                      render={() => 
                        <FriendProfile />}
                    />

                    <Route
                      exact path="/logout"
                      render={() =>
                        <Logout />}
                    />

                </React.Fragment>
                ) : (
                <React.Fragment>

                    <NotAuthedNavbar loggedIn={this.state.authenticated} />

                    <Route
                        exact path="/"
                        render={() => 
                          <Home toggleAuthenticateStatus={() => this.toggleAuthenticateStatus} />} 
                      />

                    <Route
                      exact path="/signup"
                      render={() => 
                        <Register 
                          email={this.state.email}
                          name={this.state.name}
                          password={this.state.password} />} 
                    />

                    <Route
                      exact path="/login"
                      render={() => 
                          <Login toggleAuthenticateStatus={() => this.toggleAuthenticateStatus} />}
                    />
                </React.Fragment>
              )}
          </Switch>
        </Router>
    );
  }
}

export default App;
