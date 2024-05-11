// simulate connection to db
exports.employeeDB = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data;
	},
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongo db implementation
const employeeSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Employee', employeeSchema);
