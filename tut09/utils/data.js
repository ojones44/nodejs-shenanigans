require('dotenv').config();

exports.secrets = {
	access: {
		secret: process.env.ACCESS_TOKEN_SECRET,
		expiresIn: process.env.ACCESS_EXPIRES_IN,
	},
	refresh: {
		secret: process.env.REFRESH_TOKEN_SECRET,
		expiresIn: process.env.REFRESH_EXPIRES_IN,
	},
};

exports.saltRounds = 10;
