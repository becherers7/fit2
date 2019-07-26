import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import ProfileIcon from '@material-ui/icons/Profile';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class FriendRequests extends Component {
	constructor(props) {
		super(props);
	}
	// look up material-ui navbar examples to see how they handle this.
	// after you have this rendered then you just need to have the onClick handler for posting.
	render() {
		let friendRequests = this.props.friendRequests;
		let renderFriendRequests = (
			{friendRequests ? (
				friendRequests.map((friend) => {
			        <ProfileIcon />
					<Typography>{friend.email}</Typography>
					<Button>Add</Button>
				});
			) : (
				null
			)
		}
		);

		return {renderFriendRequests}
	}
}