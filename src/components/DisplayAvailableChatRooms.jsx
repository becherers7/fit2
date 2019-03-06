import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AddRoomModal from './common/AddRoomModal';
import Grid from '@material-ui/core/Grid';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItems from './common/ListItems';
import ListHeaderAndButton from './common/ListHeaderAndButton';
import MessageBoard from './MessageBoard';
import WorkBook from './WorkBook';
import Profile from './Profile';
import CreateWorkoutForm from './CreateWorkoutForm';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 10,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  messageInput: {
    width: '100%',
    // position: '1',
    position: 'fixed',
    top: '90%',
    // right: 0;
  },
});

class PersistentDrawerLeft extends Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      channels: [],
      currentChannel: '',
      directChannels: [],
    };
  };


  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
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

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <Router>
        <React.Fragment>
          <CssBaseline />
          <Grid container className={classes.root}>
          <Grid item xs={12}>
          <AppBar
            position="fixed"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                {this.props.currentChatRoom.name}
              </Typography>
            </Toolbar>
          </AppBar>
          </Grid>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </div>
            <Divider />
                <List>
                  <ListItem>
                    <Link to="/display/workbook">
                      <ListItemText>Workbook</ListItemText>
                    </Link>
                    <ListItemSecondaryAction>
                      <Link to="/display/newWorkout">
                        <Fab>
                          <AddIcon size="small" color="primary" aria-label="Add" />
                        </Fab>
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
            <Divider />
            {/*Channels*/}
            <ListHeaderAndButton submitCreateForm={this.props.submitCreateForm} header="Channels" />
            <ListItems channels={this.props.channels} />
            <Divider />
            {/*Direct messages*/}
            <ListHeaderAndButton header="Direct Messages" />
            <ListItems channels={['Steve, Ben', 'Steve, Rose', 'Steve, Brady, Ben']} />

          </Drawer>
          <div className={classes.drawerHeader} />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <Switch>

                <Route
                  exact path="/display/"
                  component={() => <Profile />}
                />
                <Route
                  exact path="/display/workbook"
                  component={() =>
                    <WorkBook
                      emit={this.props.emit}
                      messages={this.props.messages}
                      workouts={this.props.workouts} />
                  }
                  />
                <Route
                  exact path="/display/newWorkout"
                  component={() =>
                    <CreateWorkoutForm
                      emit={this.props.emit}
                      />}
                  />
            </Switch>
          </main>
          </Grid>
        </React.Fragment>
      </Router>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);
