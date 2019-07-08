const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Message_Recipient = new Schema({
	id: String,
	recipient_id: String,
	recipient_group_id: String,
	message_id: String,
	is_read: Boolean, 
});