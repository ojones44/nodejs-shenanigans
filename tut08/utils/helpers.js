const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secrets, saltRounds } = require('../utils/data');

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

exports.comparePassword = async (givenPassword, dbPassword) => {
	const isMatch = await bcrypt.compare(givenPassword, dbPassword);
	return isMatch;
};

exports.generateToken = (username, secretType) => {
	return jwt.sign({ username }, secrets[secretType].secret, {
		expiresIn: secrets[secretType].expiresIn,
	});
};

exports.verifyToken = (token, attribute, secretType) => {
	try {
		const decoded = jwt.verify(token, secrets[secretType].secret);
		return { payload: decoded[attribute], expired: false };
	} catch (error) {
		return { payload: null, expired: error.message.includes('jwt expired') };
	}
};
