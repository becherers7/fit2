import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class FriendProfile extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		console.log('inside of friend profile: ', this.props.friend);
		return (
			<React.Fragment>
				<Typography>Welcome {this.props.friend.email} to the jam</Typography>
				<Button onClick={() => this.props.friendRequest(this.props.friend.email)}>
					Add
				</Button>
			</React.Fragment>
		)
	}
}

export default FriendProfile;