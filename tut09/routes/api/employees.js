const express = require('express');
const router = express.Router();
const path = require('path');
const { ROLES_LIST } = require('../../config/rolesList');
const { verifyRoles } = require('../../middleware/verifyRoles');

// controllers
const {
	getAllEmployees,
	getEmployee,
	createNewEmployee,
	updateEmployee,
	deleteEmployee,
} = require('../../controllers/employeesController');

router
	.route('/')
	.get(getAllEmployees)
	.post(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), createNewEmployee)
	.put(verifyRoles(ROLES_LIST.admin, ROLES_LIST.editor), updateEmployee)
	.delete(verifyRoles(ROLES_LIST.admin), deleteEmployee);

router.route('/:id').get(getEmployee);

module.exports = router;
