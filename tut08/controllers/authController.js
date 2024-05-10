const fsPromises = require('fs').promises;
const path = require('path');
const { comparePassword, generateToken } = require('../utils/helpers');
const { usersDB } = require('../model/User');

exports.auth = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res
				.status(400)
				.json({ message: 'Must provide a username and password.' });
		}

		const storedUser = usersDB.users.find(
			(storedUser) => storedUser.username === username
		);

		if (!storedUser) {
			return res
				.status(400)
				.json({ message: `${username} doesn't exist. Please register.` });
		}

		const passwordMatched = await comparePassword(
			password,
			storedUser.password
		);

		if (!passwordMatched) {
			return res.status(401).json({
				message: `Password for ${username} incorrect. Please try again.`,
			});
		}

		// generate tokens after all other conditionals passed
		const accessToken = generateToken(storedUser.username, 'access');
		const refreshToken = generateToken(storedUser.username, 'refresh');

		// grabbing all other users to spread into updated array
		const everyoneElse = usersDB.users.filter(
			(person) => person.username !== storedUser.username
		);

		// adding refresh token to current user
		const currentUser = { ...storedUser, refreshToken };

		// update array
		usersDB.setUsers([...everyoneElse, currentUser]);

		// write the json file with new array data
		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);

		// store a http only cookie with refresh token (prevent any XSS attacks)
		// not 100% secure, but http only means it is not available to JS
		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000, // one day (milliseconds)
		});
		res.status(200).json({
			message: `${username} logged in successfully.`,
			payload: accessToken,
		});
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
