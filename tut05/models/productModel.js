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
		resolve(products.find((p) => p.id === id));
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

exports.update = async (id, product) => {
	const i = products.findIndex((p) => p.id === id);
	const updatedProduct = { id, ...product };
	products[i] = updatedProduct;

	writeDataToFile('./data/products.json', products);

	return new Promise((resolve, _reject) => {
		resolve(updatedProduct);
	});
};

exports.remove = async (id) => {
	const newProducts = products.filter((p) => p.id !== id);
	writeDataToFile('./data/products.json', newProducts);

	return new Promise((resolve, _reject) => {
		resolve();
	});
};
