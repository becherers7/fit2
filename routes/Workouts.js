let express = express();
let router = express.Router();
let Workout = require('../database/models/Workout');


// router.get('/display/workbook', () => {
//
// });

router.post('/display/newWorkout', (req, res) => {
  console.log('create workout');
  let newWorkout = {
    exercises: req.body.exercises,
    daysOfWeek: req.body.daysOfWeek,
    muscleGroups: req.body.muscleGroups,
    comments: req.body.comments
  };
  if (newWorkout){
    Workout.save(newWorkout);
  }

});
