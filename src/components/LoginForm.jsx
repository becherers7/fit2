import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class LoginForm extends React.Component {
    constructor(props){
      super(props);
      console.log("our props: ", this.props);
    }
    render(){
      return(
        <React.Fragment>
          <Card className="container">
            <form action="/" onSubmit={this.props.onSubmit}>
              <h2>Login</h2>
              {this.props.successMessage}
              {this.props.errors.summary}

              <div className="field-line">
                <TextField
                  name="email"
                  aria-describedby={this.props.errors.email}
                  onChange={this.props.onChange}
                  value={this.props.user.email}
                  placeholder={"email"}
                />
              </div>
              <div className="field-line">
                <TextField
                  type="password"
                  name="password"
                  onChange={this.props.onChange}
                  aria-describedby={this.props.errors.password}
                  value={this.props.user.password}
                  placeholder={"password"}
                />
              </div>
              <div>
                <Button type="submit">Log in </Button>
              </div>
              <Typography>Don't have an account? <Link to={'/signup'}>Create one</Link>.</Typography>
            </form>
          </Card>
        </React.Fragment>
      );
    }
}

export default LoginForm;
