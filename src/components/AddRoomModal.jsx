import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import SearchFieldWithChips from './common/SearchFieldWithChips';
import AutocompleteMulti from './AutocompleteMulti';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  addButton: {
    root: {
      marginLeft: '10px'
    },
  }
});

// add autocomplete with multiple friends too invite into a channel room here.
class AddRoomModal extends React.Component {
  constructor(props){
    super(props);
    
  }
  
  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Fab className={classes.addButton} size="small" color="primary" aria-label="Add">
          <AddIcon onClick={this.props.handleClickOpen} />
        </Fab>

        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Channels are where your members can communicate and collaborate with each other.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={this.props.handleNameChange}
              label="Channel Name"
              value={this.props.channel.name}
              type="text"
              fullWidth
            />
            <br />
            <TextField
              margin="dense"
              id="purpose"
              label="Purpose (optional)"
              onChange={this.props.handlePurposeChange}
              value={this.props.channel.purpose}
              type="text"
              fullWidth
            />
            <br />
            <AutocompleteMulti handleMembersChange={this.props.handleMembersChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(event) =>
                {this.props.submitCreateForm(this.props.channel);
                  this.props.handleClose();
                  this.props.addChannel()}}
                  color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddRoomModal);
