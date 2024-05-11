const fsPromises = require('fs').promises;
const path = require('path');
const { usersDB } = require('../model/User');

exports.logout = async (req, res) => {
	//* also delete the tokens in the client

	try {
		const cookies = req.cookies;

		if (!cookies?.refreshToken) {
			return res.status(204).json({ message: 'Nothing to do.' });
		}

		const refreshToken = cookies.refreshToken;

		if (refreshToken) {
			const foundUser = usersDB.users.find(
				(storedUser) => storedUser.refreshToken === refreshToken
			);

			if (!foundUser) {
				return res
					.clearCookie('refreshToken', { httpOnly: true })
					.status(200)
					.json({
						message: 'No found user. Cookie erased',
					});
			}

			const everyoneElse = usersDB.users.filter(
				(person) => person.refreshToken !== refreshToken
			);
			const currentUser = { ...foundUser, refreshToken: '' };
			usersDB.setUsers([...everyoneElse, currentUser]);
			await fsPromises.writeFile(
				path.join(__dirname, '..', 'model', 'users.json'),
				JSON.stringify(usersDB.users)
			);

			res
				.clearCookie('refreshToken', {
					httpOnly: true,
					sameSite: 'None',
					secure: true,
				})
				.status(200)
				.json({ message: 'Logged out' });
		}
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
