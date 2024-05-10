// simulate connection to db
exports.employeeDB = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data;
	},
};
