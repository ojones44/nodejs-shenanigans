const { verifyToken } = require('../utils/helpers');

exports.verifyJWT = (req, res, next) => {
	const authHeader = req.headers['authorization'];

	if (!authHeader) return res.sendStatus(401);

	const token = authHeader.split(' ')[1];
	const { payload, expired } = verifyToken(token, 'username', 'access');

	if (payload && !expired) {
		req.username = payload;
	} else {
		return res
			.status(403)
			.json({
				JWT_message: 'Could not verify token',
				jwt: { payload, expired },
			});
	}

	next();
};
