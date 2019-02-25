import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItems from './common/ListItems';
//check to see if material-ui has a footer component that you can use for your comment section.
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
class CommentSection extends React.Component {
  constructor(props){
    super(props);
    this.message = React.createRef();
  }
  // componentDidMount(){
  //   console.log("message board: ", this.props);
  // }
  createMessage = () => {
    let message = this.message.current.value;
    // console.log(message);
    this.props.emit('chat message', {message: message});
  }
  render(){
    const { classes, theme } = this.props;
    return(
      <React.Fragment>
      <ListItems comments={this.props.comments} />
      <form action="javascript:void(0)" onSubmit={this.createMessage}>
        <input
          type="text"
          ref={this.message}
          className={classes.messageInput}
          placeholder="Be the first to leave a comment" />

      </form>
      </React.Fragment>
    )
  }
}


export default withStyles(styles, {withTheme: true})(CommentSection);
