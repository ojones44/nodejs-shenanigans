// module imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

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

// third party middleware
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/public')));

// middleware for cookies
app.use(cookieParser());

// file routes
app.use('/', require('./routes/root'));

// refresh token
app.use('/refresh', require('./routes/refresh'));

// api routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/employees', require('./routes/api/employees'));

// catches any thrown Errors and runs the callback
app.use(errorHandler);

// listen for requests
app.listen(PORT, () => {
	console.log(`CORS enabled server running on port ${PORT}`);
});
