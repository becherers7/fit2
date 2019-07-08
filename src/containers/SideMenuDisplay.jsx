import React, {Component} from 'react';
import SideMenu from '../components/SideMenu';
import io from 'socket.io-client';
import { acceptFriendRequest, getFriendRequests } from '../modules/handlers';

class SideMenuDisplay extends Component {
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
    this.socket = io('http://localhost:8000');
  }
  componentDidMount() {
      // sets array of friend requests in state
      getFriendRequests().then((friendRequests) => {
          this.setState({friendRequests: friendRequests});
      });
  }
  
  openRoom = (room) => {
    console.log("this room name: ", room); 
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    // this.socket.on('updateChannels', this.updateChannels);
    //-if channels gets updated set the current chat room to the latest chat room pushed.
    if(this.state.channels.length !== prevState.channels.length){
      let channels = this.state.channels;
      let currentChatRoom = channels[channels.length-1];
      this.setState({currentChatRoom: currentChatRoom});
    }

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
  acceptFriendRequest = (friend) => {
      acceptFriendRequest(friend).then((friends) => {
          this.setState({friends: friends});
      });
  }
  emit = (eventName, payload) => {
    if(this.socket !== undefined){
      console.log("eventName: ", eventName);
      console.log("payload: ", payload);
      this.socket.emit(eventName, payload);
    }
  }
  updateChannels = (channels) => {
    this.setState({channels: channels});
    console.log("channels: ", this.state.channels);
  }


  // Figure out a better way of managing friends state.
  // you need to next implement the displayAvailableChatRooms component from the backups file.
  // you then need to add the search for friends but with chips from material-ui on the create 
  // channels and create rooms.
  // next add sockets for creating rooms and channels based on what friend you want to chat with.
  

  render() {
    // const {getFriendRequests} = require('../modules/handlers');
    return (
      <SideMenu 
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
        emit={this.emit} />
    );
  }
}

export default SideMenuDisplay;
