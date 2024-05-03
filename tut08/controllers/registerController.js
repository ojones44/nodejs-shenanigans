const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

const fsPromises = require('fs').promises;
const path = require('path');
const { hashPassword } = require('../utils/helpers');

exports.register = async (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username || !password) {
			return res
				.status(400)
				.json({ message: 'Must provide a username and password.' });
		}

		const userExits = usersDB.users.find(
			(storedUser) => storedUser.username === username
		);

		if (userExits) {
			return res
				.status(409)
				.json({ message: `${username} already exists. Please login.` });
		}

		const newUser = {
			username,
			password: await hashPassword(password),
		};

		usersDB.setUsers([...usersDB.users, newUser]);

		await fsPromises.writeFile(
			path.join(__dirname, '..', 'model', 'users.json'),
			JSON.stringify(usersDB.users)
		);

		res.status(201).json({
			message: `New user: ${newUser.username}, created successfully.`,
		});
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
