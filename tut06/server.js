const express = require('express');
const path = require('path');

const { logger } = require('./middleware/logEvents');

const app = express();

// server file runs like a waterfall

// app.use() is a method we use to apply middleware to all routes

// built in middleware to handle urlencoded data (form data)
// essentially: 'Content-Type': application/x-www-form-urlencoded'

// putting this above everything else means it will apply to all routes that come in
app.use(express.urlencoded({ extended: false }));

// built in middleware for json
app.use(express.json());

// built in middleware for serving static files e.g. css, images
// must be in a public folder
app.use(express.static(path.join(__dirname, '/public')));

// custom middleware logger
app.use(logger);

// home route in this case is also index.html
// so passing '/' will not work if the index.html file is specified in the url

// express allows us to use regex patterns in the routing
// we can further add regex to make the .html optional

// status codes and content types with express are automatically set behind the scenes, however can also be overridden by passing in a code if needed

// syntax of express
// app.method(path, routeHandler)

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

// route handlers

// essentially how middleware works

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

// app.get('/chain(.html)?', [one, two, three]);
app.get('/chain(.html)?', one, two, three);

// catch all
app.get('/*', (req, res) => {
	// this will still send a 200 response instead of a 404 because
	// technically express will successfully find and serve the 404.html file

	// we need to explicitly specify by chaining
	res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
