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

// file routes
app.use('/', require('./routes/root'));

// api routes
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/auth', require('./routes/api/auth'));

// catches any thrown Errors and runs the callback
app.use(errorHandler);

// listen for requests
app.listen(PORT, () => {
	console.log(`CORS enabled server running on port ${PORT}`);
});
