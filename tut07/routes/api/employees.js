const express = require('express');
const router = express.Router();
const path = require('path');

// simulate connection to db
const data = {};
data.employees = require('../../data/employees.json');

router
	.route('/')
	.get((req, res) => {
		res.json({ employees: data.employees });
	})
	.post((req, res) => {
		res.json({
			name: req.body.name,
			role: req.body.role,
		});
	})
	.put((req, res) => {
		res.json({
			name: req.body.name,
			role: req.body.role,
		});
	})
	.delete((req, res) => {
		res.json({ id: req.body.id });
	});

router.route('/:id').get((req, res) => {
	res.json({ id: req.params.id });
});

module.exports = router;
