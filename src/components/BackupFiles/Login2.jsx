import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
    state = {
      username: '',
      password: '',
      redirectTo: null,
    };
    handleChange= name => event => {
      //-change state given the state name
      this.setState({ [name]: event.target.value });
    };
    handleSubmit = (event) => {
      event.preventDefault();
      console.log('login submit');
      axios.post('http://localhost:8000/user/login', {
          username: this.state.username,
          password: this.state.password
      }).then(response => {
          console.log('login response: ')
          console.log(response)
          if (response.status === 200) {
            // update App.js state
            this.props.updateUser({
                loggedIn: true,
                username: response.data.username
            });
            // update the state to redirect to home
            this.setState({
                redirectTo: '/'
            });
          }
      }).catch(error => {
          console.log('login error: ')
          console.log(error);

      });
    };
    render(){
      return(
        <React.Fragment>
            <Grid item xs={12}>
              <TextField
                value={this.state.username}
                placeholder="Enter login"
                onChange={this.handleChange('username')} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={this.state.password}
                placeholder="Enter password"
                type="password"
                onChange={this.handleChange('password')}
                />
            </Grid>
            <Button
              type="submit"
              mini
              onClick={this.handleSubmit}
            >
              Login
            </Button>
        </React.Fragment>
      )
    }
}

export default Login;
