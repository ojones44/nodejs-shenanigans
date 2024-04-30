// required in vanilla node.js in order to get data for the body of the request
// will be needed a lot so exported as a helper function

exports.getBodyData = (req) => {
	return new Promise((resolve, reject) => {
		try {
			let body = '';

			req.on('data', (chunk) => {
				body += chunk.toString();
			});

			req.on('end', () => {
				resolve(body);
			});
		} catch (error) {
			reject(error);
		}
	});
};
