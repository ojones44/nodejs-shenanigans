const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
	try {
		const db = await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
		mongoose.connection.once('open', () => {
			console.log(
				chalk.bgMagenta.underline(`Connected to ${db.connection.host}`)
			);
		});
	} catch (error) {
		console.log(
			`Could not connect to database. Error: ${chalk.bgRed.bold(
				error.message
			)} `
		);
		process.exit(1);
	}
};

module.exports = connectDB;
