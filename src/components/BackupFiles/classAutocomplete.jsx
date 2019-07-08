import React, {Component} from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import Auth from '../modules/Auth';

// we have the autocomplete working with mock data.
// next on the backend, we want to make a mongodb query for finding users based on request
// we then want to send that as the response and replace suggestions array.
// also change the name of DashboardPage and dashboard to profile. Change the routes on api too.

// const suggestions = [
//   { 
//     label: 'steve@gmail.com',
//     id: 'idSteve',
//   },
//   { 
//     label: 'alice@gmail.com',
//     id: 'idAlice',
//   },
//   { 
//     label: 'ben@gmail.com',
//     id: 'idBen', 
//   },
//   { 
//     label: 'Al@gmail.com',
//     id: 'idAl', 
//   },
//   { 
//     label: 'kelsey@gmail.com',
//     id: 'idKelsey', 
//   },
//   { 
//     label: 'roni@gmail.com',
//     id: 'idRoni', 
//   },
//   { 
//     label: 'mike@yahoo.com',
//     id: 'idMike', 
//   },
//   { 
//     label: 'carla@hotmail.com',
//     id: 'idCarla', 
//   },
// ];

// const suggestions = [];

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

let popperNode;

class IntegrationDownshift extends Component {
    constructor(props){
        super(props);
        this.state = {
          friend: '',
          suggestions: [],
        };
    };
    componentDidUpdate (prevProps, prevState, snapshot) {
        if(prevState.friend !== this.state.friend) {
            const xhr = new XMLHttpRequest();
            console.log("DashboardPage rendered");
            let friend = this.state.friend;
            let searchQuery = `friend=${friend}`;
            xhr.open('post', 'http://localhost:8000/api/findFriends');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            // set the authorization HTTP header
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
              if (xhr.status === 200) {
                  console.log("requesting users");
                  let suggestions = xhr.response.map(el => {
                      if(el.email) {
                        let email = {
                          email: el.email,
                          id: el._id
                        };
                        return email
                      }
                  });
                  this.setState({suggestions: suggestions});

              } else {
                  console.log("something went wrong");
              }
            });
            xhr.send(searchQuery);
        }
    }
    handleFindFriend = (event) => {
      console.log("find my friend: ", this.state.friend)
      this.setState({friend: event.target.value});
    }

    renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
        const isHighlighted = highlightedIndex === index;
        let isSelected = (selectedItem || '').indexOf(suggestion.email) > -1;
        // console.log("email clicked on: ", suggestion.email);
        console.log("render suggestion ");

        return (
            <MenuItem
              {...itemProps}
              key={suggestion.email}
              selected={isHighlighted}
              component="div"
              style={{
                fontWeight: isSelected ? 500 : 400,
              }}
            >
              {suggestion.email}
            </MenuItem>
        );
    }

    getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
        console.log("get suggestions: ", getSuggestions);

        return inputLength === 0
          ? []
          : this.state.suggestions.filter(suggestion => {
              const keep =
                count < 5 && suggestion.email.slice(0, inputLength).toLowerCase() === inputValue;

              if (keep) {
                count += 1;
              }

              return keep;
            });

    }
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Downshift id="downshift-simple">
                  {({
                    getInputProps,
                    getItemProps,
                    getMenuProps,
                    highlightedIndex,
                    inputValue,
                    isOpen,
                    selectedItem,
                  }) => (
                    <div className={classes.container}>
                      <TextField
                          placeholder='Find friends'
                          InputProps={{
                              fullWidth: true,
                              classes: {
                                root: classes.inputRoot,
                                input: classes.inputInput,
                              },
                              
                          }}
                          onChange={this.handleFindFriend}
                      />
                      <div {...getMenuProps()}>
                        {isOpen ? (
                          <Paper className={classes.paper} square>
                            {this.getSuggestions(this.state.friend).map((suggestion, index) =>
                              this.renderSuggestion({
                                suggestion,
                                index,
                                itemProps: this.getItemProps({ item: suggestion.email }),
                                highlightedIndex,
                                selectedItem,
                              }),
                            )}
                          </Paper>
                        ) : null}
                      </div>
                    </div>
                  )}
                </Downshift>
            </div>
        );
    }
}

export default withStyles(styles)(IntegrationDownshift);
