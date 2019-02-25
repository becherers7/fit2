const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var MessageSchema = new Schema({

     user: String,
     messageBody: String,
     roomId: {type: Schema.Types.ObjectId, ref: User},
     createDate : { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('Message', MessageSchema);
