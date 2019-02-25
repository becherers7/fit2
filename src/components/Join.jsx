import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Display extends Component {
  constructor(props){
    super(props);
    this.memberName = React.createRef();
  }
  componentDidMount(){
    console.log("Emit: ", this.props.emit);
  }
  join = () => {
    let memberName = this.memberName.current.value;
    this.props.emit('join', {name: memberName});
  }

  render() {
    let status = this.props.status;
    // console.log("status here: ", status);
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label>Full Name></label>
        <input
          type="text"
          ref={this.memberName}
          className="form-control"
          placeholder="enter your full name...."
          required
          />
        <button className="btn btn-primary">Join</button>
        <Link to='/speaker'>Join Speaker</Link>
      </form>
    )
  }
}

export default Display;
