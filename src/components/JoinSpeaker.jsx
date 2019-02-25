import React, {Component} from 'react';
//Speaker is exporting wrong name.
class JoinSpeaker extends Component {
  constructor(props){
    super(props);
    this.speakerName = React.createRef();
    this.title = React.createRef();
  }
  componentDidMount(){
    console.log("Emit: ", this.props.emit);
  }
  start = () => {
    let speakerName = this.speakerName.current.value;
    let title = this.title.current.value;
    this.props.emit('start', {name: speakerName, title: title});
  }

  render() {
    let status = this.props.status;
    // console.log("status here: ", status);
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name</label>
        <input
          type="text"
          ref={this.speakerName}
          className="form-control"
          placeholder="enter your full name...."
          required
          />

        <label>Presentation Title</label>
        <input
          type="text"
          ref={this.title}
          className="form-control"
          placeholder="enter a title for this presentation...."
          required
          />
        <button className="btn btn-primary">Join</button>
      </form>
    )
  }
}

export default JoinSpeaker;
