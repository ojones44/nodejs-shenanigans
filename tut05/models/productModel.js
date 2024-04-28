const products = require('../data/products');
const path = require('path');
const { v4: uuid } = require('uuid');

const { writeDataToFile } = require('../utils/files');

exports.findAll = () => {
	return new Promise((resolve, _reject) => {
		resolve(products);
	});
};

exports.findById = (id) => {
	return new Promise((resolve, _reject) => {
		resolve(products.find((product) => product.id === parseInt(id)));
	});
};

exports.create = async (newProduct) => {
	const newProductWithId = { id: uuid(), ...newProduct };
	products.push(newProductWithId);

	writeDataToFile('./data/products.json', products);

	return new Promise((resolve, _reject) => {
		resolve(newProductWithId);
	});
};
