import React from 'react';

class CreateChatRoomForm extends React.Component {

  componentDidMount(){
    console.log("Create Chat Room Mounted");
  }


  render() {
    // console.log("status here: ", status);
    return (
        <div>
        <label>Enter Chat Room Name></label>
        <input
          type="text"
          value={this.props.currentChatRoom}
          onChange={this.props.changeCurrentChatRoomValue}
          className="form-control"
          placeholder="enter your chat room name...."
          required
          />
        <button onClick={()=>this.props.submitCreateForm()} className="btn btn-primary">Create</button>
        </div>
    )
  }
}

export default CreateChatRoomForm;
