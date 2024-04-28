const http = require('http');

// regex
const { regExById } = require('./utils/regex');

const {
	getProducts,
	getProduct,
	createProduct,
} = require('./controllers/productsController');

const server = http.createServer((req, res) => {
	if (req.url === '/api/products' && req.method === 'GET') {
		getProducts(req, res);
	} else if (req.url.match(regExById) && req.method === 'GET') {
		const id = req.url.split('/').at(-1);
		getProduct(req, res, id);
	} else if (req.url === '/api/products' && req.method === 'POST') {
		createProduct(req, res);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Route not found' }));
	}
});

const PORT = 5000;
server.listen(PORT, () => {
	console.log(`listening on port ${PORT}`);
});
