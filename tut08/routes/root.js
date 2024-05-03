const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

router.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

// this is what will always be exported from this type of routing file
module.exports = router;