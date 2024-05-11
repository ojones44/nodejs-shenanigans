const { verifyToken } = require('../utils/helpers');

exports.verifyJWT = (req, res, next) => {
	const authHeader =
		req.headers['authorization'] || req.header['Authorization'];

	if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

	const token = authHeader.split(' ')[1];
	const { payload, expired } = verifyToken(token, 'access');

	if (payload && !expired) {
		req.username = payload.userInfo.username;
		req.roles = payload.userInfo.roles;
	} else {
		return res.status(403).json({
			JWT_message: 'Could not verify token',
			jwt: { payload, expired },
		});
	}

	next();
};
