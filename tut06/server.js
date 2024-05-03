// server.js file runs like a waterfall

// module imports
const express = require('express');
const path = require('path');

// middleware
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const { corsOptions } = require('./cors/options');
const { errorHandler } = require('./middleware/errorHandler');

// initialize express
const app = express();

//! ----------------------------------------------------------- //

// custom middleware logger
// if using something like this, it needs to be above cors middleware
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

//! ----------------------------------------------------------- //

/** 
app.use() is a method we use to apply middleware to all routes

built in middleware to handle urlencoded data (form data)
essentially: 'Content-Type': application/x-www-form-urlencoded'

three types of middleware: built-in, custom, third-party

putting this above everything else means it will apply to all routes that come in
app.use(express.urlencoded({ extended: false }));
*/

//built in middleware for json
app.use(express.json());

/**
built in middleware for serving static files e.g. css, images
must be in a public folder
*/

app.use(express.static(path.join(__dirname, '/public')));

//! ----------------------------------------------------------- //

/**  
home route in this case is also index.html
so passing '/' will not work if the index.html file is specified in the url

express allows us to use regex patterns in the routing
we can further add regex to make the .html optional

status codes and content types with express are automatically set behind the scenes, however can also be overridden by passing in a code if needed

syntax of express: app.method(path, routeHandler) 
*/

app.get('^/$|/index(.html)?', (req, res) => {
	// res.send('hello world');
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/new-page(.html)?', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});

app.get('/old-page(.html)?', (req, res) => {
	// redirects in express will send a 302 by default
	// what is preferred here is a 301
	res.redirect(301, '/new-page.html');
});

app.get(
	'/hello(.html)?',
	(req, res, next) => {
		console.log('attempted to load hello.html');
		next();
	},
	(req, res) => {
		res.send('Running next function 1');
	}
);

//! ----------------------------------------------------------- //

// essentially how middleware works, using the next function

const one = (req, res, next) => {
	console.log('first handler');
	next();
};

const two = (req, res, next) => {
	console.log('second handler');
	next();
};

const three = (req, res) => {
	console.log('third handler');
	res.send('Finished chaining');
};

// can be passed in as array or separate functions
// app.get('/chain(.html)?', [one, two, three]);
app.get('/chain(.html)?', one, two, three);

//! ----------------------------------------------------------- //

//? compare app.use VS. app.all
/** 
app.use does not accept regex in the path
it is also more likely to be used for middleware
// e.g. app.use('/')

app.all is used for routing, which accepts regex
so we can use this instead of get, for the catch all function
*/

// catch all
app.all('/*', (req, res) => {
	// this will still send a 200 response instead of a 404 because
	// technically express will successfully find and serve the 404.html file

	// we need to explicitly specify by chaining
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

//! ----------------------------------------------------------- //

// catches any thrown Errors and runs the callback
app.use(errorHandler);

//! ----------------------------------------------------------- //

// create port variable and listen for requests

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`CORS enabled server running on port ${PORT}`);
});

//! ----------------------------------------------------------- //
