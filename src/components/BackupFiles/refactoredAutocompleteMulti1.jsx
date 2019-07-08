import React from 'react';
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
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
    flexWrap: 'wrap',
    width: '100%',
  },
  inputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  menuItem: {
  	zIndex: 1000,
  }
});

//MULTISELECT NEEDS TO GO OVER THE MODAL SOME HOW. YEESH.
//NEXT PLUG IN FRIENDS WITH THE XHR.
class AutocompleteMulti extends React.Component {
  constructor() {
    super(props);
    this.state = {
      inputValue: '',
      selectedItem: [],
      suggestions: [],
    }
  }

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    console.log('this selectedItem: ', selectedItem);
    if (selectedItem.length && !inputValue.length && event.key === 'Backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };
  //added
  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    });
  };
  // create a fetchFriends method like in regular auto complete, call with in here.
  // onChange method for the input field
  inputOnChange = (event) => {
    if (!event.target.value) {
      return
    }
    this.setState({ inputValue: event.target.value });//added this, but I think that's what
    //itemToString does.
    console.log('inputValue: ', this.state.inputValue);
    this.fetchFriends(event.target.value);
  }
  // method to fetch the friends from our database of users
  fetchFriends = (friend) => {
    const xhr = new XMLHttpRequest();
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
          console.log(this.state.suggestions);

      } else {
          console.log("something went wrong");
      }
    });
    xhr.send(searchQuery);
  }

  // onChange method for the input field
  inputOnChange = (event) => {
    if (!event.target.value) {
      return
    }
    this.fetchFriends(event.target.value);
  }

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

	return (
		<div className={classes.container}>
		  	<Downshift 
          // onChange={this.downshiftOnChange} 
          itemToString={item => (item ? item.email : '')}
          id="downshift-multiple"
          inputValue={inputValue}
          onChange={this.handleChange}
          selectedItem={selectedItem}
          >
		    	{({ 
            selectedItem, 
            // selectedItem: selectedItem2, needs to change to this
            getInputProps, 
            // getInputProps, I have this
            getItemProps, 
            // getItemProps, I have this
            highlightedIndex, 
            // highlightedIndex, I have this
            isOpen, 
            // isOpen, I have this
            inputValue, 
            // inputValue: inputValue2, needs to change to this.
            getLabelProps,
            //might not be needed
          }) => (
		    	<div className={classes.container}>
		        <TextField 
					{...getInputProps({
						placeholder: "Invite friends to join..",
						onChange: this.inputOnChange,
						startAdornment: this.state.suggestions.map(item => (
						  <Chip
						    key={item}
						    tabIndex={-1}
						    label={item}
						    className={classes.chip}
						    onDelete={this.handleDelete(item)}
						  />
						)),
						onChange: this.inputOnChange,
						onKeyDown: this.handleKeyDown,
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
						    selected={index}
						    style={{
						      fontWeight: index ? 500 : 400,
						    }}
						    className={classes.menuItem}
						    >
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

export default withStyles(styles)(AutocompleteMulti);
