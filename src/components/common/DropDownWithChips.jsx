import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

function getStyles(option, that) {
  return {
    fontWeight:
      that.props.array.indexOf(option) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium,
  };
}

class DropdownWithChips extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;
    console.log("props: ", this.props);
    return (
      <div className={classes.root}>

        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">{this.props.label}</InputLabel>
          <Select
            multiple
            value={this.props.array}
            onChange={this.props.handleArrayChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {this.props.options.map((option, index) => (
              <MenuItem key={option + index} value={option} style={getStyles(option, this)}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(DropdownWithChips);
