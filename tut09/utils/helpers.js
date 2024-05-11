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

exports.generateToken = (payload, secretType) => {
	return jwt.sign(payload, secrets[secretType].secret, {
		expiresIn: secrets[secretType].expiresIn,
	});
};

exports.verifyToken = (token, secretType) => {
	try {
		const payload = jwt.verify(token, secrets[secretType].secret);
		return { payload, expired: false };
	} catch (error) {
		return { payload: null, expired: error.message.includes('jwt expired') };
	}
};
