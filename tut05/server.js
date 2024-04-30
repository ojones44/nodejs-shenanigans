const http = require('http');

// regex
const { regExById } = require('./utils/regex');

// helpers
const { getId } = require('./utils/helpers');

const {
	getProducts,
	getProduct,
	createProduct,
	updateProduct,
	deleteProduct,
} = require('./controllers/productsController');

const server = http.createServer((req, res) => {
	if (req.url === '/api/products' && req.method === 'GET') {
		getProducts(req, res);
	} else if (req.url.match(regExById) && req.method === 'GET') {
		const id = getId(req);
		getProduct(req, res, id);
	} else if (req.url === '/api/products' && req.method === 'POST') {
		createProduct(req, res);
	} else if (req.url.match(regExById) && req.method === 'PUT') {
		const id = getId(req);
		updateProduct(req, res, id);
	} else if (req.url.match(regExById) && req.method === 'DELETE') {
		const id = getId(req);
		deleteProduct(req, res, id);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
