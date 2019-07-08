const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var User_Group = new Schema({
	user_id: String,
	group_id: String,
	create_date: { type: Date, default: Date.now },
	is_active: Boolean,
});

module.exports = mongoose.model('User_Group', User_Group);