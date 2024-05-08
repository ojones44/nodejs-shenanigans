const { verifyToken } = require('../utils/helpers');

exports.verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader) return res.sendStatus(401);

	const token = authHeader.split(' ')[1];
	verifyToken(token, 'username', 'access', req, res, next);
};
