import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';


class DashboardPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);

    this.state = {
      secretData: '',
      user: {}
    };
  }

  /**
   * This method will be executed after initial rendering.
   */
   // too many components are making asyncronous tasks causing a memory leak from these
   // component did mounts. Figure out how to make these asynchronous proper like.
  componentDidMount() {
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', 'http://localhost:8000/api/dashboard');
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // // set the authorization HTTP header
    // xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     this.setState({
    //       secretData: xhr.response.message,
    //       user: xhr.response.user
    //     });
    //   }
    // });
    // xhr.send();
    this.setState({
        secretData: 'yo',
        user: 'me'
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <Dashboard 
        secretData={this.state.secretData} 
        user={this.state.user} />
    );
  }

}

export default DashboardPage;
