import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AddIcon from '@material-ui/icons/Add';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function Icons(props){
  if(props.icon){
    return(
      <React.Fragment>
        <IconButton color="inherit">
          {chooseIcon(props.icon)}
        </IconButton>
      </React.Fragment>
    )
  }
}

function chooseIcon(iconName) {
  switch (iconName) {
    case 'account':
    return <AccountCircle />;
    break;

    case 'add':
    return <AddIcon />

    case 'inbox':
    return <InboxIcon />
    break;

    case 'home':
    return <HomeIcon />;
    break;

    case 'left':
    return <ChevronLeftIcon />;
    break;

    case 'mail':
    return <MailIcon/>;
    break;
    
    case 'menu':
    return <MenuIcon />;
    break;

    case 'more':
    return <MoreIcon />;
    break;

    case 'notifications':
    return <NotificationsIcon />;
    break;

    case 'right':
    return <ChevronLeftRight />;
    break;

    default:
    return null;
  }
}