import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRoomModal from '../components/AddRoomModal';
import Sockets from '../modules/Sockets';
import { saveChannel } from '../modules/handlers';

class AddRoom extends Component {

    //constructor for props and state.
    constructor(props){
        super(props);
        this.state = {
          openModal: false,
          channel: {
            name: '',
            purpose: '',
            members: [],
          },
          channels: [],
        }
    }
    handleClickOpen = () => {
      this.setState({ openModal: true });
    }
    handleClickClose = () => {
      this.setState({openModal: false});
    }
    handleClose = () => {
      this.setState({ openModal: false });
    }
    handleNameChange = (event) => {
    let oldChannel = this.state.channel;
    oldChannel.name = event.target.value;
    this.setState({currentChannel: oldChannel});
    }
    handlePurposeChange = (event) => {
      let oldChannel = this.state.channel;
      oldChannel.purpose = event.target.value;
      this.setState({channel: oldChannel});
    }
    handleMembersChange = (members) => {
      let oldChannel = this.state.channel;
      oldChannel.members = members;
      console.log('oldChannel: ', oldChannel);
      this.setState({channel: oldChannel});
    };
    addChannel = () => {
      let oldChannel = this.state.channel;
      let newChannel = {
        name: '',
        purpose: '',
        members: [],
      };
      this.setState({channel: newChannel});
    }
    submitCreateForm = (channel) => {
      console.log("submit channel: ", channel);
      this.setState({currentChatRooms: channel});
      this.props.emit('create channel', channel);
      saveChannel(channel).then((result) => {
          console.log("result: ", result);
      });
    
    }

    render(){
      return(
        <div>
        {this.state.openModal ? (
          <AddRoomModal
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            open={this.state.openModal}
            handleNameChange={this.handleNameChange}
            handlePurposeChange={this.handlePurposeChange}
            handleMembersChange={this.handleMembersChange} 
            addChannel={this.addChannel}
            channel={this.state.channel}
            channels={this.state.channels}
            submitCreateForm={this.submitCreateForm} />
        ) : (
          <Fab size="small" color="secondary" aria-label="Add">
            <AddIcon onClick={this.handleClickOpen} />
          </Fab>
        ) }
        </div>
      );
    }
}
export default AddRoom;
