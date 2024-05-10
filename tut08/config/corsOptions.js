// CORS options

// local host domains will be removed in production
const whitelist = [
	'http://localhost:5000',
	'http://localhost:5173',
	'http://127.0.0.1:5500',
];

// the 'origin' variable in the options, refers to the req.headers.origin
// where the request is coming from (domain)

// the !origin conditional allows us to make API requests, which doesn't come with an origin header as it is not from a website (development)
corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
};

module.exports = { corsOptions, whitelist };
