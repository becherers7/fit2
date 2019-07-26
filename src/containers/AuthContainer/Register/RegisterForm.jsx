import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class RegisterForm extends Component {
  constructor(props){
    super(props);
  };
  render(){
    return(
      <React.Fragment>
        <Card className="container">
          <form action="/" onSubmit={this.props.onSubmit}>
            <h2 className="card-heading">Sign Up</h2>

            <div>
              <TextField
                placeholder="name"
                name="name"
                aria-describedby={this.props.errors.name}
                onChange={this.props.onChange}
                value={this.props.user.name}
              />
            </div>

            <div>
              <TextField
                placeholder="email"
                name="email"
                aria-describedby={this.props.errors.email}
                onChange={this.props.onChange}
                value={this.props.user.email}
              />
            </div>

            <div>
              <TextField
                placeholder="password"
                type="password"
                name="password"
                onChange={this.props.onChange}
                aria-describedby={this.props.errors.password}
                value={this.props.user.password}
              />
            </div>

            <div>
              <Button type="submit">Sign up</Button>
            </div>

            <Typography>Already have an account? <Link to={'/login'}>Log in</Link></Typography>
          </form>
        </Card>
      </React.Fragment>
    )
  }
}

export default RegisterForm;

