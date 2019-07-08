import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddRoomModal from '../AddRoomModal';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';

export default function ListItems(props){
  let listItems;
  // console.log("our channels: ", props.channels);
  if(Array.isArray(props.channels)){
    return(
      <React.Fragment>
      <List>
      {props.channels.map((item, index) => (
        <ListItem button key={item + index}>
        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText onClick={()=>props.openRoom(item)} primary={item.name} />
        </ListItem>
      ))}
      </List>
      </React.Fragment>
    )
  }
  if(Array.isArray(props.messages)){
    return(
      <React.Fragment>
        <List>
        {props.messages.map((message, index) => (
          <ListItem alignItems="flexStart" key={message.message + index}>
            <ListItemText primary={message.message} />
          </ListItem>
        ))}
        </List>
      </React.Fragment>
    )
  }
  if(Array.isArray(props.exercises) && props.exercises.length > 0){
    return(
      <React.Fragment>
        <Grid container>

        <Grid item xs={4}>
          <strong>Exercises</strong>
        </Grid>
        <Grid item xs={4}>
          <strong>Sets</strong>
        </Grid>
        <Grid item xs={4}>
          <strong>Reps</strong>
        </Grid>
          {props.exercises.map((exercise, index) => {
                return(
                  <React.Fragment>
                    <Grid item xs={4}>
                      {exercise.exercise}
                    </Grid>
                    <Grid item xs={4}>
                      {exercise.sets}
                    </Grid>
                    <Grid item xs={4}>
                      {exercise.reps}
                    </Grid>
                  </React.Fragment>
                )
              }
            )
          }
        </Grid>
      </React.Fragment>
    )
  }else{
    return null;
  }
  if(props.comments){
    return(
      <React.Fragment>
      <List center>
      {props.comments.map((comment, index) => (
        <ListItem button key={index}>
        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
        <ListItemText primary={comment.user} />
        <ListItemText secondary={comment.createDate} />
        </ListItem>
      ))}
      </List>
      </React.Fragment>
    )
  }
}
