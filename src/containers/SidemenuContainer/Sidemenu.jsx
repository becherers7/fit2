import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from 'react-router-dom';

{/*material-ui*/}
import PropTypes from 'prop-types';
import classNames from 'classnames';
import theme from '../../styles/sideMenuTheme';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import SearchIcon from '@material-ui/icons/Search';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Fab from '@material-ui/core/Fab';

import Icons from '../../common/MaterialUI/Icons';

{/*components for list*/}
import ListHeaderAndButton from './List/ListHeaderAndButton';

{/*same directory*/}
import WorkBook from '../WorkoutContainer/WorkBook';
import CreateWorkout from '../WorkoutContainer/CreateWorkout';


import Auth from '../../modules/Auth';

import DisplayFriends from '../../common/DisplayFriends';
import Autocomplete from '../../common/Autocomplete/Autocomplete';

import ListItems from '../../common/List/ListItems';
import DashboardPage from '../../components/Dashboard';
import AuthedNavbar from '../../components/Navbar/AuthedNavbar';


class Sidemenu extends Component {
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
		          <Icons icon="mail" />
		        </Badge>
		      </IconButton>
		      <p>Messages</p>
		    </MenuItem>
		    <MenuItem onClick={this.props.handleMobileMenuClose}>
		      <IconButton color="inherit">
		        <Badge badgeContent={11} color="secondary">
		          <Icons icon="notifications" />
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
						<Icons icon="menu" />
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
									<Icons icon="mail" />
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
							<Icons icon="more" />
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
					{theme.direction === 'ltr' ? <Icons icon="left" /> : <Icons icon="right" />}
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
							<Icons icon="add" />
						</Fab>
						</Link>
						</ListItemSecondaryAction>
					</ListItem>
				</List>
				<Divider />
				{/*Channels*/}
				<ListHeaderAndButton
					unregisterHandler={this.props.unregisterHandler} 
					submitCreateForm={this.props.submitCreateForm} 
					header="Channels"
					emit={this.props.emit} />
				<ListItems 
					channels={this.props.channels}
					openRoom={this.props.openRoom} />
				<Divider />
				</Drawer>
				<main
				className={classNames(classes.content, {
				[classes.contentShift]: open,
				})}
				>
					<Switch>
						<Route
						exact path="/"
							component={() => 
								<DashboardPage />
							}
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
								/>
							}
						/>
					</Switch>

				</main>
			</div>
		)
	}
}

export default withStyles(theme, { withTheme: true })(Sidemenu);