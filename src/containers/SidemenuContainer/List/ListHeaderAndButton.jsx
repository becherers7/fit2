import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
// import { Link } from 'react-router-dom';
import AddRoom from '../../../common/Modal/AddRoom';

export default function ListHeaderAndButton(props){
  
  return (
    <React.Fragment>
      <List>
        <ListItem>
          <ListItemText>{props.header}</ListItemText>
          <ListItemSecondaryAction>
            <AddRoom unregisterHandler={props.unregisterHandler} emit={props.emit} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </React.Fragment>
  )
}
