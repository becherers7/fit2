import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

export default class Icons extends React.Component function() {
	constructor(props) {
		super(props);
	}
	chooseIcon = (iconName) => {
		switch (iconName) {
			case 'account':
			returnIcon(AccountCircle);
			break;

			case 'home':
			returnIcon(HomeIcon);
			break;

			case 'mail':
			returnIcon(MailIcon)
			break;
			
			case 'menu':
			returnIcon(MenuIcon);
			break;

			case 'more':
			returnIcon(MoreIcon);
			break;

			case 'notifications':
			returnIcon(NotificationsIcon);
			break;

			default:
			return null;
		}
	}
	render() {
		let returnIcon = (icon) => {
			return (
				<IconButton>
					{icon}
				</IconButton>
			);
		};

	}
}