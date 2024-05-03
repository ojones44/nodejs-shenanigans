// module imports
const express = require('express');
const path = require('path');

// middleware imports
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { corsOptions } = require('./config/corsOptions');
const { errorHandler } = require('./middleware/errorHandler');

// creat port variable
const PORT = process.env.PORT || 5000;

// initialize express
const app = express();

// custom middleware
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

// built-in middleware
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/subdir', express.static(path.join(__dirname, '/public')));

// file routes
app.use('/', require('./routes/root'));
app.use('/subdir', require('./routes/subdir'));

// api routes
app.use('/employees', require('./routes/api/employees'));

// catch all
app.all('/*', (req, res) => {
	res.status(404);
	// looks at the req headers to see what content type is accepted
	if (req.accepts('html')) {
		res.sendFile(path.join(__dirname, 'views', '404.html'));
	} else if (req.accepts('json')) {
		res.json({ error: '404 not found' });
	} else {
		res.type('txt');
		res.send('404 not found');
	}
});

// catches any thrown Errors and runs the callback
app.use(errorHandler);

// listen for requests
app.listen(PORT, () => {
	console.log(`CORS enabled server running on port ${PORT}`);
});
