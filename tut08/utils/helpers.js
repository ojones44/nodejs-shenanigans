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

exports.verifyToken = (token, attribute, secretType, req, res, next) => {
	return jwt.verify(token, secrets[secretType].secret, (err, decoded) => {
		if (err) return res.status(403).json({ JWT_message: 'Expired token' });
		req[attribute] = decoded[attribute];
		next();
	});
};

exports.getRefreshToken = (token, secretType, attribute, data) => {
	return jwt.verify(token, secrets[secretType].secret, (err, decoded) => {
		if (err || data[attribute] !== decoded[attribute])
			return res
				.status(403)
				.json({ JWT_message: 'Could not verify refresh token' });
		const accessToken = jwt.sign(
			{ [attribute]: decoded[attribute] },
			'access',
			{
				expiresIn: secrets.access.expiresIn,
			}
		);
		return accessToken;
	});
};
