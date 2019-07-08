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
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItems from './common/ListItems';
import ListHeaderAndButton from './common/ListHeaderAndButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AuthedNavbar from './Navbar';
import Autocomplete from './Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Badge from '@material-ui/core/Badge';
import DisplayFriends from './common/DisplayFriends';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Auth from '../modules/Auth';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import WorkBook from './WorkBook';
import DashboardPage from '../containers/DashboardPage';
import CreateWorkout from '../containers/CreateWorkout';
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
  appBarMargin: {
  	marginBottom: '5%',
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
    padding: theme.spacing.unit * 3,
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
});

class SideMenu extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { classes, theme } = this.props;
	    const { open } = this.props;
	    const { anchorEl, mobileMoreAnchorEl } = this.props;
	    const isMenuOpen = Boolean(anchorEl);
	    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	    let renderLoggedInMenu = (
	      <Menu
	        anchorEl={anchorEl}
	        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
	        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
	        open={isMenuOpen}
	        onClose={this.props.handleMenuClose}
	      >
	        <MenuItem onClick={this.props.handleMenuClose}>Profile</MenuItem>
	        <MenuItem onClick={this.props.handleMenuClose}>My account</MenuItem>
	        <MenuItem onClick={this.props.handleMenuClose}>Logout</MenuItem>
	      </Menu>
	    );

		const renderMobileMenu = (
		  <Menu
		    anchorEl={mobileMoreAnchorEl}
		    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		    open={isMobileMenuOpen}
		    onClose={this.props.handleMenuClose}
		  >
		    <MenuItem onClick={this.props.handleMobileMenuClose}>
		      <IconButton color="inherit">
		        <Badge badgeContent={4} color="secondary">
		          <MailIcon />
		        </Badge>
		      </IconButton>
		      <p>Messages</p>
		    </MenuItem>
		    <MenuItem onClick={this.props.handleMobileMenuClose}>
		      <IconButton color="inherit">
		        <Badge badgeContent={11} color="secondary">
		          <NotificationsIcon />
		        </Badge>
		      </IconButton>
		      <p>Notifications</p>
		    </MenuItem>
		    <MenuItem onClick={this.props.handleProfileMenuOpen}>
		      <IconButton color="inherit">
		        <AccountCircle />
		      </IconButton>
		      <p>Profile</p>
		    </MenuItem>
		  </Menu>
		);

		return (
			<div className={classes.root}>
				<CssBaseline />
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
					onClick={this.props.handleDrawerOpen}
					className={classNames(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						Fit App
					</Typography>
					<div className={classes.search}>
					<div className={classes.searchIcon}>
						<SearchIcon />
					</div>
					<Autocomplete />
					</div>
					<div className={classes.grow} />
						<div className={classes.sectionDesktop}>
							<IconButton color="inherit">
								<Badge badgeContent={4} color="secondary">
									<MailIcon />
								</Badge>
							</IconButton>

							<DisplayFriends 
							friendRequests={this.props.friendRequests}
							acceptFriendRequest={()=>this.props.acceptFriendRequest()} />
							<IconButton
							aria-owns={isMenuOpen ? 'material-appbar' : undefined}
							aria-haspopup="true"
							onClick={this.props.handleProfileMenuOpen}
							color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
						<div className={classes.sectionMobile}>
						<IconButton aria-haspopup="true" onClick={()=>this.handleMobileMenuOpen()} color="inherit">
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
				</AppBar>
				<React.Fragment>
				{renderLoggedInMenu}
				{renderMobileMenu}
				</React.Fragment>
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
					<IconButton onClick={this.props.handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem>
						<Link href="/workbook" to="/workbook">
							<ListItemText>Workbook</ListItemText>
						</Link>
						<ListItemSecondaryAction>
						<Link href="/newWorkout" to="/newWorkout">
						<Fab size="small" color="secondary" aria-label="Add">
							<AddIcon />
						</Fab>
						</Link>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Divider />
				{/*Channels*/}
				<ListHeaderAndButton 
					submitCreateForm={this.props.submitCreateForm} 
					header="Channels"
					emit={this.props.emit} />
				<ListItems 
					channels={this.props.channels}
					openRoom={this.props.openRoom} />
				<Divider />
				{/*Direct messages*/}
				<ListHeaderAndButton 
					header="Direct Messages"
					emit={this.props.emit} />
				<ListItems directMessages={['Steve, Ben', 'Steve, Rose', 'Steve, Brady, Ben']} />
				</Drawer>
				<main
				className={classNames(classes.content, {
				[classes.contentShift]: open,
				})}
				>
					<Switch>
						<Route
						exact path="/"
						component={() => <DashboardPage />}
						/>

						<Route
						exact path="/workbook"
						component={() =>
						<WorkBook
						emit={this.props.emit}
						messages={this.props.messages}
						workouts={this.props.workouts} />
						}
						/>

						<Route
						exact path="/newWorkout"
						component={() =>
						<CreateWorkout
						emit={this.props.emit}
						/>}
						/>
					</Switch>

				</main>
			</div>
		)
	}
}

export default withStyles(styles, { withTheme: true })(SideMenu);