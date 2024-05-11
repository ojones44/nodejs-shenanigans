const { verifyToken, generateToken } = require('../utils/helpers');
const { usersDB } = require('../model/User');

exports.handleRefreshToken = async (req, res) => {
	try {
		const cookies = req.cookies;

		if (!cookies?.refreshToken) {
			return res.status(401).json({ message: 'No cookies, what can you do.' });
		}

		const refreshToken = cookies.refreshToken;

		if (refreshToken) {
			const foundUser = usersDB.users.find(
				(storedUser) => storedUser.refreshToken === refreshToken
			);

			if (!foundUser) {
				return res.status(403).json({
					message: 'Unable to authenticate. Please login or register.',
				});
			}

			const { payload, expired } = verifyToken(refreshToken, 'refresh');

			if (payload) {
				const roles = Object.values(foundUser.roles);
				const accessToken = generateToken(
					{ userInfo: { username: payload.userInfo.username, roles } },
					'access'
				);
				res.json({ newToken: accessToken });
			} else {
				res
					.status(403)
					.json({ JWT_message: 'Could not refresh token', payload, expired });
			}
		} else {
			res.status(403).json({ message: 'No refresh token' });
		}
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
