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
import { findFriends } from '../modules/handlers';

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

//FUCK YEAH STEVE! YOU FIGURED IT OUT, PLUS ULTRA
class AutocompleteMulti extends React.Component {
  constructor(props) {
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
    	console.log('another test');
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      }, () => {
      	console.log('inside');
      	this.props.handleMembersChange(selectedItem);
      });
    }
  };
  
  handleChange = item => {
    let { selectedItem } = this.state;
    console.log('handleChange');
    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item.email];
    }
    // console.log('inputValue ', this.state.inputValue);
    this.setState({
      inputValue: '',
      selectedItem,
    }, () => {
    	this.props.handleMembersChange(selectedItem);
    });
  };
  
  // onChange method for the input field
  inputOnChange = (event) => {
    if (!event.target.value) {
      return
    }
    this.setState({ inputValue: event.target.value });//added this, but I think that's what
    //itemToString does.
    this.fetchFriends(event.target.value);
  }
  
  // method to fetch the friends from our database of users
  fetchFriends = (friend) => {
      findFriends(friend).then((suggestions) => {
          this.setState({suggestions: suggestions});
      });
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
	          itemToString={item => (item ? item.email : '')}
	          id="downshift-multiple"
	          inputValue={inputValue}
	          onChange={this.handleChange}
	          selectedItem={selectedItem}
          >
		  {({ 
            selectedItem, 
            getInputProps, 
            getItemProps, 
            highlightedIndex, 
            isOpen, 
            inputValue, 
            getLabelProps,
          }) => (
		    	<div className={classes.container}>
		        <TextField 
					InputProps={getInputProps({
					placeholder: "Invite friends to join..",
					onChange: this.inputOnChange,
					startAdornment: selectedItem.map(item => (
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
  		                      
  		    	 />
			  
			    {isOpen ? (
					<Paper className={classes.paper} square>
					{
						// filter the suggestions in the state
						this.state.suggestions//inputValue needs to be changed to inputValue2 potentially.
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
