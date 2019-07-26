import React, {Component} from 'react';
import FriendProfile from '../components/FriendProfile';
import { withRouter } from 'react-router';
import { makeFriendRequest } from '../modules/handlers';

class FriendProfilePage extends Component {
	constructor (props) {
		super(props);
		this.state = {
			friend: '',
		}
	}
	componentDidMount(){
		let friend = this.props.history.location.state.friend;
		this.setState({friend: friend});
	}
	
	friendRequest = (email) => {
		// sends a post request that finds the user you wish to befriend based on email string
  		makeFriendRequest(email).then((response) => {
  			console.log("sent: ", response);
  		});
	}
	render(){
		const { history } = this.props;
		return <FriendProfile friendRequest={this.friendRequest} friend={this.state.friend} />
	};
}

export default withRouter(FriendProfilePage);