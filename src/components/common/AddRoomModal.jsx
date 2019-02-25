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
import SearchFieldWithChips from './SearchFieldWithChips';

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

class AddRoomModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      channel: {
        name: '',
        purpose: ''
      },
      channels: [],
    };
  }
  componentDidMount(){
    this.setState({open: this.props.open});
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleNameChange = (event) => {
    let oldChannel = this.state.channel;
    oldChannel.name = event.target.value;
    this.setState({currentChannel: oldChannel});
  }
  handlePurposeChange = (event) => {
    let oldChannel = this.state.channel;
    oldChannel.purpose = event.target.value;
    this.setState({channel: oldChannel});
  }
  addChannel = () => {
    let oldChannel = this.state.channel;
    let newChannel = {
      name: '',
      purpose: ''
    };
    this.setState({channel: newChannel});
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
        <Fab className={classes.addButton} size="small" color="primary" aria-label="Add">
          <AddIcon onClick={this.handleClickOpen} />
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create a channel</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Channels are where your members can communicate and collaborate with eachother.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              onChange={this.handleNameChange}
              label="Channel Name"
              value={this.state.channel.name}
              type="text"
              fullWidth
            />
            <br />
            <TextField
              margin="dense"
              id="purpose"
              label="Purpose (optional)"
              onChange={this.handlePurposeChange}
              value={this.state.channel.purpose}
              type="text"
              fullWidth
            />
            <br />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={(event) =>
                {this.props.submitCreateForm(this.state.channel);
                  this.handleClose();
                  this.addChannel()}}
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
