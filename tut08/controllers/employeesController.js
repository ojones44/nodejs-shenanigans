const { v4: uuid } = require('uuid');
const { employeeDB } = require('../model/Employee');

//!----------------------------------------------------------------!//

const getAllEmployees = (req, res) => {
	res.json(employeeDB.employees);
};

//!----------------------------------------------------------------!//

const getEmployee = (req, res) => {
	const employee = employeeDB.employees.find(
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

	employeeDB.setEmployees([...employeeDB.employees, newEmployee]);
	res.status(201).json({ updatedEmployees: employeeDB.employees });
};

//!----------------------------------------------------------------!//

const updateEmployee = (req, res) => {
	const employee = employeeDB.employees.find(
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

	const filtered = employeeDB.employees.filter(
		(storedData) => storedData.id !== req.params.id
	);
	employeeDB.setEmployees([...filtered, updatedEmployee]);

	res.status(200).json({ updated: updatedEmployee });
};

//!----------------------------------------------------------------!//

const deleteEmployee = (req, res) => {
	const employee = employeeDB.employees.find(
		(employee) => employee.id === req.params.id
	);

	if (!employee) {
		return res.status(400).json({
			message: `Can't delete. Employee id: ${req.params.id} does not exist`,
		});
	}

	const filteredEmployees = employeeDB.employees.filter(
		(employee) => employee.id !== req.params.id
	);

	employeeDB.setEmployees([...filteredEmployees]);
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
