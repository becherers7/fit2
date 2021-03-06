import React from 'react';

//material-ui
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';

//same directory
import ListItems from '../../common/List/ListItems';

//common components
import CommentSection from '../../common/CommentSection';

const styles = theme => ({
  card: {
    marginTop: '5%',
  }
});

class WorkBook extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        workouts: [],
        currentWorkoutIndex: 0
      }
    }
    componentDidMount(){
      if(this.props.workouts){
        this.setState({workouts: this.props.workouts});
      }
    }
    componentDidUpdate(prevProps, prevState, snapshot){
      if(this.props.workouts !== prevState.workouts){
        console.log("incoming workouts: ", this.props.workouts);
        this.setState({workouts: this.props.workouts});
      }
    }
    nextWorkout = () => {
      let currentWorkoutIndex = this.state.currentWorkoutIndex;
      let workoutsArrayLength = this.state.workouts.length
      if(currentWorkoutIndex < workoutsArrayLength - 1){
        currentWorkoutIndex++;
        this.setState({currentWorkoutIndex: currentWorkoutIndex});
      }
    }
    prevWorkout = () => {
      let currentWorkoutIndex = this.state.currentWorkoutIndex;
      if(currentWorkoutIndex > 0){
        currentWorkoutIndex--;
        this.setState({currentWorkoutIndex: currentWorkoutIndex});
      }
    }
    render(){
      //-if there are no chat rooms only display create chat room form.
      if(this.state.workouts.length>0){
        let workouts = this.state.workouts;
        let currentWorkoutIndex = this.state.currentWorkoutIndex;
        return (
          <React.Fragment>
            <Grid container className={classes.card}>
              <Grid item xs={12}>
                <h2 className="centerFont">WorkBook</h2>
                <p className="centerFont">A book like view of all your workouts</p>
              </Grid>
              <Grid item xs={2}>
              <Fab>
                <ChevronLeftIcon onClick={this.prevWorkout} />
              </Fab>
              </Grid>
              <Grid item xs={8}>
                <h3>{this.state.workouts[currentWorkoutIndex].label}</h3>
                <h4>Day of week: {workouts[currentWorkoutIndex].day}</h4>
                <ListItems exercises={workouts[currentWorkoutIndex].exercises} />
              </Grid>
              <Grid item xs={2}>
              <Fab>
                <ChevronRightIcon onClick={this.nextWorkout} />
              </Fab>
              </Grid>
              <Grid item xs={12}>
                <CommentSection comments={workouts[currentWorkoutIndex].comments} />
              </Grid>
            </Grid>
          </React.Fragment>
        )
      }else{
        return (
          <React.Fragment>
            <Grid container>
              <h3>You have no workouts</h3>
            </Grid>
          </React.Fragment>
        );
      }
    }
}


export default WorkBook;
