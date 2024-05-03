const usersDB = {
	users: require('../model/users.json'),
	setUsers: function (data) {
		this.users = data;
	},
};

const { comparePassword } = require('../utils/helpers');

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

		res.status(200).json({ message: `${username} logged in successfully.` });
	} catch (error) {
		res.status(500).json({ message: `Server error: ${error.message}` });
	}
};
