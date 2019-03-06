const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var CommentSchema = new Schema({

     user: String,
     commentBody: String,
     workoutId: {type: Schema.Types.ObjectId, ref: User},
     createDate : { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Comment', CommentSchema);
