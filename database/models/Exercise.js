const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
 label: String,
 createDate : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Exercise', Muscle);
