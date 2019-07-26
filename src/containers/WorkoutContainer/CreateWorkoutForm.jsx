import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';//use for selecting a value.
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

import DropDownWithChips from '../../common/Dropdown/DropDownWithChips';
import ListItems from '../../common/List/ListItems';

const styles = theme => ({
  card: {
    marginTop: '5%',
  }
});

class CreateWorkoutForm extends React.Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let muscleGroups =["Arms", "Legs", "Chest", "Back", "Cardio"];
    const {classes} = this.props;
    return(
      <React.Fragment>
      <FormControl className={classes.card}>
        <Grid container>
        <Grid item xs={12}>
          <DropDownWithChips
            options={daysOfWeek}
            array={this.props.daysOfWeek}
            handleArrayChange={this.props.handleSelectChange}
            label="Days" />
        </Grid>
        <Grid item xs={12}>
          <DropDownWithChips
            options={muscleGroups}
            array={this.props.muscleGroups}
            handleArrayChange={this.props.handleMuscleGroupChange}
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



          {this.props.exercises.map(exercise=>{
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
                onChange={this.props.handleChange('exercise')}
                value={this.props.exercise}
                // ref={ref => {
                //   this.TextFieldLabelRef = ref;
                // }}
                placeholder="Enter name of exercise" />
          </Grid>
          <Grid item xs={4}>
              <TextField
                type="text"
                ref={this.props.sets}
                onChange={this.props.handleChange('sets')}
                value={this.props.sets}
                placeholder="0 sets" />
          </Grid>
          <Grid item xs={4}>
                <TextField
                  type="text"
                  ref={this.props.reps}
                  onChange={this.props.handleChange('reps')}
                  value={this.props.reps}
                  placeholder="0 reps" />
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.props.createExercise}>Add</Button>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={this.props.createWorkout}>Submit</Button>
          </Grid>
        </Grid>
        </FormControl>
      </React.Fragment>
    )
  }
}

export default withStyles(styles, { withTheme: true })(CreateWorkoutForm);
