import React, {Component} from 'react';
import JoinSpeaker from './JoinSpeaker';

function ConnectStatusDisplay(member, emit) {
  // console.log("test member: ", member.member);
  // console.log("test emit: ", member.emit);
  if(member.member.name && member.member.type === "speaker"){
    console.log("member: ", member.member.name);
    return (
      <React.Fragment>
        <h2>Questions</h2>
        <p>Attendance</p>
      </React.Fragment>
    )
  }else{
    return (
      <React.Fragment>
        <h1>Start the presentation</h1>
        <JoinSpeaker emit={member.emit} />
      </React.Fragment>
    )
  }
}

function DisconnectStatusDisplay(props) {
  return <h1>Disconnected!</h1>;
}
function DetermineConnection(properties){
  // console.log("properties: ", properties.properties.status);
  if(properties.properties.status === "connected"){
    return <ConnectStatusDisplay member={properties.properties.member} emit={properties.properties.emit} />
  }else{
    // console.log("status here: ", properties.properties.status);
    return <DisconnectStatusDisplay />
  }
}

class DisplaySpeaker extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let status = this.props.status;
    return <DetermineConnection properties={this.props} />
  }
}

export default DisplaySpeaker;
