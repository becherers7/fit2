const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Group = new Schema({
	name: String,
	create_date: { type: Date, default: Date.now },
	is_active: Boolean,
});