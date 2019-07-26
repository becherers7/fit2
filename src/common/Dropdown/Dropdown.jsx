import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Dropdown extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    const { classes } = this.props;
    // console.log("props: ", this.props);

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="day-of-week">Day of week</InputLabel>
          <Select
            value={this.props.dayOfWeek}
            onChange={this.props.handleSelectChange}
            inputProps={{
              day: 'dayOfWeek',

            }}
            open={this.props.open}
            onClose={this.props.handleClose}
            onOpen={this.props.handleOpen}
          >
          <MenuItem key="default">Day of week</MenuItem>
          {this.props.options.map((option, index)=>{
            return <MenuItem key={index} value={option}>{option}</MenuItem>
          })}

          </Select>
        </FormControl>
      </form>
    );
  }
}



export default withStyles(styles)(Dropdown);
