import React, {Component} from 'react';
import Sidemenu from './Sidemenu';
import io from 'socket.io-client';
import { acceptFriendRequest, getFriendRequests } from '../../modules/handlers';
import { CREATE_CHANNEL, UPDATE_CHANNEL } from '../../modules/socketEvents';

class SidemenuContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      mobileMoreAnchorEl: null,
      friendRequests: [],
      friends: [],
      channels: [],
      messages: [],
    };
  }
  componentDidMount() {
      // sets array of friend requests in state
      getFriendRequests().then((friendRequests) => {
          this.setState({friendRequests: friendRequests});
      });
      console.log("component did mount");
      // this.socketUpdate(UPDATE_CHANNEL);
      console.log("socket update successful");
  }

  
  // componentDidUpdate(prevProps, prevState, snapshot){
  //   this.props.listenOnServer('update channel', this.props.unregisterHandler(UPDATE_CHANNEL));
  //   //-if channels gets updated set the current chat room to the latest chat room pushed.
  //   if(this.state.channels.length !== prevState.channels.length){
  //     let channels = this.state.channels;
  //     let currentChatRoom = channels[channels.length-1];
  //     this.setState({currentChatRoom: currentChatRoom});
  //   }

  // }

  openRoom = (room) => {
    console.log("this room name: ", room); 
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };
  //add channels here then place in the componentDidUpdate the socket.on(updateChannels);
  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };
  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };
  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  updateChannels = (channel) => {
    console.log("listening for: ", channel);
    this.props.listenOnServer(UPDATE_CHANNEL, channel);
    this.setState({ channels: this.state.channels.concat(channel) });
    console.log("our new state: ", this.state.channels);
  }

  // updateDirectMessages = (message) => {
  //   this.props.listenOnServer(UPDATE_DIRECT_MESSAGES, message);
  //   this.setState({ chatHistory: this.state.chatHistory.concat(entry) })

  // }

  // updateWorkouts = (eventName, workout) => {
  //   this.props.listenOnServer(UPDATE_WORKOUTS, workout);
  //   this.setState({ workouts: this.state.workouts.concat(workout) })
  // }
  

  render() {

    return (
      <Sidemenu 
        openRoom={this.openRoom}
        friends={this.state.friends}
        friendRequests={this.state.friendRequests}
        acceptFriendRequest={this.acceptFriendRequest}
        handleMobileMenuClose={this.handleMobileMenuClose}
        handleMobileMenuOpen={this.handleMobileMenuOpen}
        handleMenuClose={this.handleMenuClose}
        handleProfileMenuOpen={this.handleProfileMenuOpen}
        handleDrawerClose={this.handleDrawerClose}
        handleDrawerOpen={this.handleDrawerOpen}
        open={this.state.open}
        mobileMoreAnchorEl={this.state.mobileMoreAnchorEl}
        anchorEl={this.state.anchorEl}
        channels={this.state.channels}
        messages={this.state.messages}
        emit={this.props.emitToServer}
        unregisterHandler={this.props.unregisterHandler} />
    );
  }
}

export default SidemenuContainer;
