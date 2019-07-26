import React, {Component} from 'react';
import Card  from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Auth from '../modules/Auth';
import Typography from '@material-ui/core/Typography';

class Home extends Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    console.log("this props homepage: ", this.props);
    return (
      <React.Fragment>
        <Card className="container">
          <CardContent>
          <h3>Welcome to home</h3>
            {Auth.isUserAuthenticated() ? (
              <Typography style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</Typography>
            ) : (
              <Typography style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</Typography>
            )}
          </CardContent>
        </Card>
      </React.Fragment>
    )
  }
};

export default Home;

