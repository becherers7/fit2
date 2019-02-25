import React, {Component} from 'react';
import Display from './Display';

class Audience extends Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log("emit 1: ", this.props.emit);
    console.log("Audience member: ", this.props.member)
    return (
      <div>
        <Display
          status={this.props.status}
          member={this.props.member}
          emit={this.props.emit}
          audience={this.props.audience} />
      </div>
    );
  }
}

export default Audience;
