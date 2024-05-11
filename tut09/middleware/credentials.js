const { whitelist } = require('../config/corsOptions');

// middleware to handle CORS issue with cookies

/* 
if using fetch in the client, a credentials option needs to be
incuded in the options object, in order for fetch to send the cookie
(axios will have a withCredentials flag)

this will then throw a CORS error, saying the Access-Control-Allow-Credentials
is set to ''. It must be true when the credentials are set to include in the fetch options.

this middleware fires off before the CORS middleware, to check if the origin is in the accepted origins list, and if so, set the required header to true
*/

exports.credentials = (req, res, next) => {
	const origin = res.headers.origin;
	if (whitelist.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true);
	}
	next();
};
