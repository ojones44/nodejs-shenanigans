const Product = require('../models/productModel');

exports.getProducts = async (_req, res) => {
	try {
		const products = await Product.findAll();
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(products));
	} catch (error) {
		console.log(error);
	}
};

exports.getProduct = async (_req, res, id) => {
	try {
		const product = await Product.findById(id);

		if (!product) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Product not found' }));
		} else {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(product));
		}
	} catch (error) {
		console.log(error);
	}
};

exports.createProduct = async (req, res) => {
	try {
		let body = '';

		req.on('data', (chunk) => {
			body += chunk.toString();
		});

		req.on('end', async () => {
			const { name, description, price } = JSON.parse(body);

			const newProduct = await Product.create({ name, description, price });

			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ newProduct: newProduct }));
		});
	} catch (error) {
		console.log(error);
	}
};
