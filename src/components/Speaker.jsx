import React, {Component} from 'react';
import DisplaySpeaker from './DisplaySpeaker';

class Speaker extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("looking at this.props", this.props);
    return (
      <div>
        <DisplaySpeaker
          status={this.props.status}
          member={this.props.member}
          emit={this.props.emit}
        />
      </div>
    );
  }
}

export default Speaker;
