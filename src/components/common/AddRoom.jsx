import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AddRoomModal from './AddRoomModal';

class AddRoom extends Component {
  /////-------

  //////////////////////
  /////  LIFECYCLE METHODS
    constructor(props){
        super(props);
        this.state = {
          open: false,
        }

    }
    componentDidMount(){
      console.log(this.state);
    }
    handleClickOpen = () => {
      this.setState({ open: true });
    };
    handleClickClose = () => {
      this.setState({open: false});
    }
    renderDialog = () => {
      return (
        <AddRoomModal
          handleClickOpen={this.handleClickOpen}
          handleClickClose={this.handleClickClose}
          open={this.state.open} />
      )
    }
    handleClose = () => {
      this.setState({ open: false });
    };
    render(){
      return(
        <div>
        {this.state.open ? (
          <AddRoomModal
            handleClickOpen={this.handleClickOpen}
            handleClose={this.handleClose}
            open={this.state.open} />
        ) : (
          <Fab size="small" color="secondary" aria-label="Add">
            <AddIcon onClick={this.handleClickOpen} />
          </Fab>
        ) }
        </div>
      );
    }
}
export default AddRoom;
