import React, {Component} from 'react';
import Join from './Join';

function ConnectStatusDisplay(member, emit, audience) {
  console.log("test member: ", member.member);
  console.log("test emit: ", member.emit);
  if(member.member.name){
    console.log("member: ", member.member.name);
    return (
      <React.Fragment>
        <h2>Welcome {member.member.name}</h2>
        <p>{member.audience.length} audience members connected</p>
        <p>Questions will appear here.</p>
      </React.Fragment>
    )
  }else{
    return (
      <React.Fragment>
        <h1>Join the Session</h1>
        <Join emit={member.emit} />
      </React.Fragment>
    )
  }
}

function DisconnectStatusDisplay(props) {
  return <h1>Disconnected!</h1>;
}
function DetermineConnection(properties){
  console.log("properties: ", properties.properties.status);
  if(properties.properties.status === "connected"){
    return <ConnectStatusDisplay member={properties.properties.member} emit={properties.properties.emit} audience={properties.properties.audience} />
  }else{
    console.log("status here: ", properties.properties.status);
    return <DisconnectStatusDisplay />
  }
}

class Display extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let status = this.props.status;
    return <DetermineConnection properties={this.props} />
  }
}

export default Display;
