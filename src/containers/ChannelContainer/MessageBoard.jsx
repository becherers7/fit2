import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItems from './common/ListItems';
const styles = theme => ({
  root: {
    display: 'flex',
  },
  messageInput: {
    width: '100%',
    // position: '1',
    position: 'fixed',
    top: '90%',
    // right: 0;
  },
});
class MessageBoard extends React.Component {
  constructor(props){
    super(props);
    this.message = React.createRef();
  }
  
  createMessage = () => {
    let message = this.message.current.value;
    // console.log(message);
    this.props.emit('chat message', {message: message});
  }
  render(){
    const { classes, theme } = this.props;
    return(
      <React.Fragment>
      <form action="javascript:void(0)" onSubmit={this.createMessage}>
        <ListItems messages={this.props.messages} />
        <input
          type="text"
          ref={this.message}
          className={classes.messageInput}
          placeholder="Some random text...." />
          
      </form>
      </React.Fragment>
    )
  }
}


export default withStyles(styles, {withTheme: true})(MessageBoard);
