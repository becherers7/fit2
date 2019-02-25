const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var RoomSchema = new Schema({

     name: { type: String, lowercase: true, unique: true },
     users: [{
       type: Schema.Types.ObjectId,
       ref: 'Users'
     }],
     messages: [{
       type: Schema.Types.ObjectId,
       ref: 'Messages'
     }],
     createDate : { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Room', RoomSchema);
