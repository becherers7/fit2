import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
class Header extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // this.setState({})
  }
  render() {
    // console.log(this.props.title);
    console.log("properties in header: ", this.props);
    let speaker = this.props.speaker.speaker;
    console.log("our super awesome speaker: ", speaker);
    return (
      <div>
        <header className="col-sm-10">
          <h3>
          {this.props.title}
          </h3>
          <h5>{this.props.speaker.speaker}</h5>
        </header>
        <div className="col-sm-2">
          <span id="connection-status" className={this.props.status}></span>
        </div>
      </div>
    );
  }
}
Header.defaultProps = {
  status: 'disconnected'
}

export default Header;
