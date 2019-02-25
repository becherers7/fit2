const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var UsersSchema = new Schema({

     username: String,
     firstName: String,
     lastName: String,
     password: String,
     email: String,
     workouts: [{
           type: Schema.Types.ObjectId,
           ref: 'Workouts'
     }],
     avatar: { data: Buffer, contentType: String },//https://stackoverflow.com/questions/29780733/store-an-image-in-mongodb-using-node-js-express-and-mongoose
     friends: [],
     messages: [],
     activeFlag: Boolean,
     createDate : { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Users', UsersSchema);
