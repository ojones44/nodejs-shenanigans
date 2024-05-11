const express = require('express');
const router = express.Router();
const { register } = require('../../controllers/registerController');
const { auth } = require('../../controllers/authController');

router.post('/register', register);
router.post('/login', auth);

module.exports = router;
