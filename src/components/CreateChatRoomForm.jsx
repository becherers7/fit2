import React from 'react';
import Button from '@material-ui/core/Button';
class CreateChatRoomForm extends React.Component {

  componentDidMount(){
    console.log("Create Chat Room Mounted");
  }


  render() {
    // console.log("status here: ", status);
    return (
        <React.Fragment>
        <label>Enter Chat Room Name></label>
        <input
          type="text"
          value={this.props.currentChatRoom}
          onChange={this.props.changeCurrentChatRoomValue}
          className="form-control"
          placeholder="enter your chat room name...."
          required
          />
        <Button onClick={()=>this.props.submitCreateForm()} mini>Create</Button>
        </React.Fragment>
    )
  }
}

export default CreateChatRoomForm;
