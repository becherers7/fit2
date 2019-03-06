import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ListItems from './common/ListItems';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';//use for selecting a value.
import FormControl from '@material-ui/core/FormControl';
import Dropdown from './common/Dropdown';
import DropDownWithChips from './common/DropDownWithChips';
import FormLabel from '@material-ui/core/FormLabel';

class CreateWorkoutForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      exercises: [],
      exercise: '',
      sets: '',
      reps: '',
      daysOfWeek: [],
      muscleGroups: [],
      name: '',
      open: false,
    }
    // this.exercises = React.createRef();
    // this.workoutName = React.createRef();
    // this.workoutDay = React.createRef();
  }
  createWorkout = () => {

    let workout = {
      exercises: this.state.exercises,
      muscleGroups: this.state.muscleGroups,
      daysOfWeek: this.state.daysOfWeek,
      comments: [],
    };
    this.props.emit('create workout', workout);
  }
  createExercise = () => {
    let exercise = {
      exercise: this.state.exercise,
      sets: this.state.sets,
      reps: this.state.reps,
    }
    let exercises = [...this.state.exercises];
    exercises.push(exercise);
    this.setState({exercises: exercises});
    this.setState({exercise: ''});
    this.setState({sets: ''});
    this.setState({reps: ''});
    this.props.emit('createWorkout', {workout: exercise});
  }
  handleChange= name => event => {
    console.log("event.target.name", name);
    console.log("event.target.value", event.target.value);
    this.setState({ [name]: event.target.value });
  }
  handleSelectChange = (event) => {

    this.setState({daysOfWeek: event.target.value});
  }
  handleMuscleGroupChange = event => {
    this.setState({ muscleGroups: event.target.value });
  };

  render(){
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let muscleGroups =["Arms", "Legs", "Chest", "Back", "Cardio"];
    return(
      <React.Fragment>
      <FormControl>
        <Grid container>
        <Grid item xs={12}>
          <DropDownWithChips
            options={daysOfWeek}
            array={this.state.daysOfWeek}
            handleArrayChange={this.handleSelectChange}
            label="Days" />
        </Grid>
        <Grid item xs={12}>
          <DropDownWithChips
            options={muscleGroups}
            array={this.state.muscleGroups}
            handleArrayChange={this.handleMuscleGroupChange}
            label="Types" />
        </Grid>

        <br />
        <br />
        <br />
          <Grid item xs={4}>
            <FormLabel>Exercise</FormLabel>
          </Grid>
          <Grid item xs={4}>
            <FormLabel>Sets</FormLabel>
          </Grid>
          <Grid item xs={4}>
            <FormLabel>Reps</FormLabel>
          </Grid>



          {this.state.exercises.map(exercise=>{
            return(
              <React.Fragment>

                <Grid item xs={4}>
                  {exercise.exercise}
                </Grid>
                <Grid item xs={4}>
                  {exercise.sets}
                </Grid>
                <Grid item xs={4}>
                  {exercise.reps}
                </Grid>
              </React.Fragment>
            )
          })}


          <Grid  item xs={4}>
              <TextField
                type="text"
                // ref={this.exercise}
                onChange={this.handleChange('exercise')}
                value={this.state.exercise}
                // ref={ref => {
                //   this.TextFieldLabelRef = ref;
                // }}
                placeholder="Enter name of exercise" />
          </Grid>
          <Grid item xs={4}>
              <TextField
                type="text"
                ref={this.sets}
                onChange={this.handleChange('sets')}
                value={this.state.sets}
                placeholder="0 sets" />
          </Grid>
          <Grid item xs={4}>
                <TextField
                  type="text"
                  ref={this.reps}
                  onChange={this.handleChange('reps')}
                  value={this.state.reps}
                  placeholder="0 reps" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.createExercise}>Add</Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.createWorkout}>Submit</Button>
          </Grid>
        </Grid>
        </FormControl>
      </React.Fragment>
    )
  }
}

export default CreateWorkoutForm;
