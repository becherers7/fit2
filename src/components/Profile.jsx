import React, {Component} from 'react';

class Profile extends React.Component {
  constructor(props){
    super(props);
  };
  componentDidMount(){
    console.log("profile mounted");
  };
  render(){
    return(
      <h3>Profile</h3>
    );
  }
}

export default Profile;
