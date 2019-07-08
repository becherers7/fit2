const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 var MessageSchema = new Schema({
	id: String,
	subject: String,
	creator_id: { type: Schema.Types.ObjectId, ref: User },
	message_body: String,
	create_date: { type: Date, default: Date.now}
	parent_message_id: Number,
	expiry_date: { type: Date },
	is_rmdr: Boolean,
	next_rmdr_date: { type: Date },
	rmdr_frequency_id: Number
  });

  module.exports = mongoose.model('Message', MessageSchema);
