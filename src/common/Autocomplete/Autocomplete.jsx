import React, { Component } from 'react'
import Downshift from 'downshift';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router";

import { findFriends } from '../../modules/handlers';

const styles = theme => ({
  root: {},
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
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
  divider: {
    height: theme.spacing.unit * 2,
  },
});
//refactor the api call, you keep calling it on every single on change which is potentially bad.

class Autocomplete extends Component {
      constructor(props) {
        super(props);
        this.state = {
          suggestions: []
        }
      }
      // onChange method for the input field
      inputOnChange = (event) => {
        if (!event.target.value) {
          return
        }
        this.fetchFriends(event.target.value);
      }
      // input field for the <Downshift /> component, place navigation here.
      downshiftOnChange = (selectedFriend) => {
        // inside this friend url, send the selectedFriend as state.
        this.props.history.push('/friend', {friend: selectedFriend});
      }
      // method to fetch the friends from our database of users
      fetchFriends = (friend) => {
            findFriends(friend).then((suggestions) => {
                this.setState({suggestions: suggestions});
            });
      }
      render() {
        const {classes, history} = this.props;
        return (
          <div className={classes.root}>
          <Downshift 
            onChange={this.downshiftOnChange} 
            itemToString={item => (item ? item.email : '')}>
            {({selectedItem, getInputProps, getItemProps, highlightedIndex, isOpen, inputValue, getLabelProps }) => (
              <div className={classes.container}>
                <TextField 
                  {...getInputProps({
                    placeholder: "Find friends",
                    onChange: this.inputOnChange
                  })}
                  InputProps={{
                    fullWidth: true,
                    classes: {
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    },
                              
                  }} />
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {
                      // filter the suggestions in the state
                      this.state.suggestions
                        .filter(item => !inputValue || item.email.toLowerCase().includes(inputValue.toLowerCase()))
                        .slice(0, 10) // return just the first ten.
                        // map the filtered suggestions and display emails of friends
                        .map((item, index) => (
                          <MenuItem
                            {...getItemProps({ key: index, index, item })}
                            selected={index === true}
                            style={{
                              fontWeight: index ? 500 : 400,
                            }}>
                            {item.email}
                          </MenuItem>
                        ))
                    }
                  </Paper>
                ) : null}
              </div>
            )}
          </Downshift>
          </div>
        )
      }
    }

export default withRouter(withStyles(styles)(Autocomplete));