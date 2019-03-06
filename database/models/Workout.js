const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var WorkoutSchema = new Schema({

     author: {type: Schema.Types.ObjectId, ref: 'User'},
     exercises: [{
       exercise: String,
       reps: Integer,
       sets: Integer,
     }],
     comments: [{
       type: Schema.Types.ObjectId,
       ref: 'Comments'
     }],
     likes: Integer,
     sharedWith: [{
       type: Schema.Types.ObjectId, ref: 'users'
     }],
     muscleGroups: [{
       type: Schema.Types.ObjectId,
       ref: 'Muscles',
     }],
     createDate : { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Workout', MessageSchema);
