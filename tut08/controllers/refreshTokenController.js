const { getRefreshToken } = require('../utils/helpers');

const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

exports.handleRefreshToken = async (req, res) => {
	try {
		const cookies = req.cookies;

		if (!cookies?.jwt) {
			return res
				.status(401)
				.json({ message: 'No web token cookies, what can you do 🤷🏻‍♂️' });
		}

		const refreshToken = cookies.jwt;

		const foundUser = usersDB.users.find(
			(storedUser) => storedUser.refreshToken === refreshToken
		);

		if (!foundUser) {
			return res
				.status(403)
				.json({ message: `${username} doesn't exist. Please register.` });
		}

		const accessToken = getRefreshToken(
			refreshToken,
			'refresh',
			'username',
			foundUser
		);

		res.json({ newToken: accessToken });
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
