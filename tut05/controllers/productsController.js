const Product = require('../models/productModel');
const { getBodyData } = require('../utils/getBodyData');

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
		const body = await getBodyData(req);

		const { name, description, price } = JSON.parse(body);

		const newProduct = await Product.create({ name, description, price });

		res.writeHead(201, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ newProduct: newProduct }));
	} catch (error) {
		console.log(error);
	}
};

exports.updateProduct = async (req, res, id) => {
	try {
		const productExists = Product.findById(id);

		if (!productExists) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'item not found' }));
		} else {
			const body = await getBodyData(req);

			const { name, description, price } = JSON.parse(body);

			const product = {
				name: name || productExists.name,
				description: description || productExists.description,
				price: price || productExists.price,
			};

			const updatedProduct = await Product.update(id, product);

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ updatedProduct: updatedProduct }));
		}
	} catch (error) {
		console.log(error);
	}
};

exports.deleteProduct = async (_req, res, id) => {
	try {
		const productExists = Product.findById(id);

		if (!productExists) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'could not delete, item not found' }));
		} else {
			await Product.remove(id);
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: `Item ${id} removed` }));
		}
	} catch (error) {
		console.log(error);
	}
};
