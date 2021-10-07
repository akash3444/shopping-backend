const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	username: String,
	email: {
		type: String,
		unique: true
	},
	password: String,
	isAdmin: {
		type: Boolean,
		default: false
	}
});

module.exports = model('users', userSchema);