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

// we have the autocomplete working with mock data.
// next on the backend, we want to make a mongodb query for finding users based on request
// we then want to send that as the response and replace suggestions array.
// also change the name of DashboardPage and dashboard to profile. Change the routes on api too.

const suggestions = [
  { 
    label: 'steve@gmail.com',
    id: 'idSteve',
  },
  { 
    label: 'alice@gmail.com',
    id: 'idAlice',
  },
  { 
    label: 'ben@gmail.com',
    id: 'idBen', 
  },
  { 
    label: 'Al@gmail.com',
    id: 'idAl', 
  },
  { 
    label: 'kelsey@gmail.com',
    id: 'idKelsey', 
  },
  { 
    label: 'roni@gmail.com',
    id: 'idRoni', 
  },
  { 
    label: 'mike@yahoo.com',
    id: 'idMike', 
  },
  { 
    label: 'carla@hotmail.com',
    id: 'idCarla', 
  },
];

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  let isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  console.log("id clicked on: ", suggestion.id);

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.label}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.label}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value) {
  const inputValue = deburr(value.trim()).toLowerCase();
  let searchQuery = `user=${inputValue}`;
  const inputLength = inputValue.length;
  let count = 0;
  const xhr = new XMLHttpRequest();
  console.log("DashboardPage rendered");
  xhr.open('post', 'http://localhost:8000/api/findFriends');
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // set the authorization HTTP header
  xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
  xhr.responseType = 'text';
  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      console.log("requesting users");
    } else {
      console.log("something went wrong");
    }
  });
  xhr.send(searchQuery);

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
        console.log("suggestion: ", suggestion);
        const keep =
          count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

        if (keep) {
          count += 1;
        }

        return keep;
      });
}

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

function IntegrationDownshift(props) {
  const { classes } = props;

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
            {renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                placeholder: 'Find friends (friend@gmail.com)',
              }),
            })}
            <div {...getMenuProps()}>
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(inputValue).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.label }),
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

IntegrationDownshift.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationDownshift);
