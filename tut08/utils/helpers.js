const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.hashPassword = async (password) => {
	const salt = await bcrypt.genSalt(saltRounds);
	const hashedPassword = await bcrypt.hash(password, salt);
	return hashedPassword;
};

exports.comparePassword = async (givenPassword, dbPassword) => {
	const isMatch = await bcrypt.compare(givenPassword, dbPassword);
	return isMatch;
};
