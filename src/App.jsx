import React, { Component } from 'react';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles';

// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom';

// import Home from './components/Home.jsx';
import Auth from './modules/Auth';
import AuthedNavbar from './components/Navbar';
import DashboardPage from './containers/DashboardPage';
import FriendProfilePage from './containers/FriendProfilePage';
import HomePage from './containers/HomePage';
import Login from './containers/Login';
import LoginForm from './components/LoginForm';
import Logout from './containers/Logout';
import NotAuthedNavbar from './components/common/NotAuthedNavbar';
import Register from './containers/Register';
import SideMenuDisplay from './containers/SideMenuDisplay';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
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
    // added both navbars. next place relevant icons in each.
    // in authed navbar have a home page icon that takes you to home.
    // in authed navbar have a profile image icon that gives logout or go to profile option
    // in not authed navbar, place the login form in the navbar, used linkedin and facebook aesthetics
    // underneath the navbar display register component
    // underneath register have a footer that is like linkedin's with the links it goes to.

    return (
          <Router>
            <Switch>      
              {Auth.isUserAuthenticated() ? (
                <React.Fragment>
                  {/*<div>
                                      <Link to="/dashboard" href="/dashboard">Dashboard</Link>
                                      <Link to="/logout" href="/logout">Log out</Link>
                                    </div>*/}
                    
                    <SideMenuDisplay workouts={this.state.workouts} />
                    {/*<Route
                                          exact path="/"
                                          render={() => 
                                            <HomePage toggleAuthenticateStatus={() => this.toggleAuthenticateStatus} />} 
                                        />
                                        <Route
                                          exact path="/dashboard"
                                          render={() =>
                                            <DashboardPage />}
                                        />*/}
                    <Route
                      exact path="/friend"
                      render={() => 
                        <FriendProfilePage />}
                    />
                    <Route
                      exact path="/logout"
                      render={() =>
                        <Logout />}
                    /> 
                </React.Fragment>
                ) : (
                <React.Fragment>
                  {/*(<div className="top-bar-right">
                                      <Link to="/login" href="/login">Log in</Link>
                                      <Link to="/signup" href="/signup">Sign up</Link>
                                    </div>*/}
                    <NotAuthedNavbar loggedIn={this.state.authenticated} />
                    <Route
                        exact path="/"
                        render={() => 
                          <HomePage toggleAuthenticateStatus={() => this.toggleAuthenticateStatus} />} 
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
