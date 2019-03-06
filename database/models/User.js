const mongoose = require('mongoose')
let Schema = mongoose.Schema
let bcrypt = require('bcryptjs');
mongoose.promise = Promise;

// Define userSchema
let userSchema = new Schema({

	username: { type: String, unique: false, required: false },
	password: { type: String, unique: false, required: false },
	workouts:[{
		type: Schema.Types.ObjectId,
		ref: 'Workouts'
	}],

})

// Define schema methods
userSchema.methods = {
	checkPassword: function (inputPassword) {
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
	if (!this.password) {
		console.log('models/user.js =======NO PASSWORD PROVIDED=======')
		next();
	} else {
		console.log('models/user.js hashPassword in pre save');

		this.password = this.hashPassword(this.password)
		next();
	}
});

let User = mongoose.model('User', userSchema)
module.exports = User
