import React, {Component} from 'react';
import CreateWorkoutForm from './CreateWorkoutForm';
import Sockets from '../../modules/Sockets.js';

class CreateWorkout extends React.Component {
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
  }
  createWorkout = () => {

    let workout = {
      exercises: this.state.exercises,
      muscleGroups: this.state.muscleGroups,
      daysOfWeek: this.state.daysOfWeek,
      comments: [],
    };
    let socketsInstance = new Sockets.getInstance();
    socketsInstance.emit('create workout', workout);
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
    return (
      <CreateWorkoutForm
        handleChange={this.handleChange}
        handleSelectChange={this.handleSelectChange}
        handleMuscleGroupChange={this.handleMuscleGroupChange}
        createExercise={this.createExercise}
        createWorkout={this.createWorkout}
        sets={this.state.sets}
        reps={this.state.reps}
        exercise={this.state.exercise}
        exercises={this.state.exercises}
        daysOfWeek={this.state.daysOfWeek}
        muscleGroups={this.state.muscleGroups}
        name={this.state.name}
        open={this.state.open} />
    )
  }
}

export default CreateWorkout;