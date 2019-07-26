import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
class ErrorPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Error 404</h3>
        <p>Were you looking for this page?</p>
        <ul>
          <li>
            <Link to="/">Join as audience</Link>
          </li>
          <li>
            <Link to="/speaker">Start the presentation</Link>
          </li>
          <li>
            <Link to="/board">View board</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default ErrorPage;
