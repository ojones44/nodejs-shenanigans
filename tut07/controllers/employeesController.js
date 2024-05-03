const { v4: uuid } = require('uuid');

// simulate connection to db
const data = {
	employees: require('../model/employees.json'),
	setEmployees: function (data) {
		this.employees = data;
	},
};

//!----------------------------------------------------------------!//

const getAllEmployees = (req, res) => {
	res.json(data.employees);
};

//!----------------------------------------------------------------!//

const getEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === req.params.id
	);

	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee id: ${req.params.id} does not exist` });
	}

	res.status(200).json({ employee: employee });
};

//!----------------------------------------------------------------!//

const createNewEmployee = (req, res) => {
	const newEmployee = {
		id: uuid(),
		name: req.body.name,
		role: req.body.role,
	};

	if (!newEmployee.name || !newEmployee.role) {
		return res.status(400).json({ message: 'Name and role are required' });
	}

	data.setEmployees([...data.employees, newEmployee]);
	res.status(201).json({ updatedEmployees: data.employees });
};

//!----------------------------------------------------------------!//

const updateEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === req.params.id
	);

	if (!employee) {
		return res
			.status(400)
			.json({ message: `Employee id: ${req.params.id} does not exist` });
	}

	const updatedEmployee = {
		id: employee.id,
		name: req.body.name ? req.body.name : employee.name,
		role: req.body.role ? req.body.role : employee.role,
	};

	const filtered = data.employees.filter(
		(storedData) => storedData.id !== req.params.id
	);
	data.setEmployees([...filtered, updatedEmployee]);

	res.status(200).json({ updated: updatedEmployee });
};

//!----------------------------------------------------------------!//

const deleteEmployee = (req, res) => {
	const employee = data.employees.find(
		(employee) => employee.id === req.params.id
	);

	if (!employee) {
		return res.status(400).json({
			message: `Can't delete. Employee id: ${req.params.id} does not exist`,
		});
	}

	const filteredEmployees = data.employees.filter(
		(employee) => employee.id !== req.params.id
	);

	data.setEmployees([...filteredEmployees]);
	return res
		.status(200)
		.json({ message: `Employee id: ${req.params.id} deleted` });
};

module.exports = {
	getAllEmployees,
	getEmployee,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
};
