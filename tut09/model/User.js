// simulate connection to db
exports.usersDB = {
	users: require('./users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongo db implementation
const userSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	roles: {
		user: {
			type: Number,
			default: 2001,
		},
		editor: Number,
		admin: Number,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: String,
});

module.exports = mongoose.model('User', userSchema);
