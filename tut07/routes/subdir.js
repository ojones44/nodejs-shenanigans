const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'));
});

router.get('/test(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'));
});

// this is what will always be exported from this type of routing file
module.exports = router;
