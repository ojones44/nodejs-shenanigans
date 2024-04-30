const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (msg, fileName) => {
	const datetime = `${format(new Date(), 'dd/MM/yyyy @ HH:mm:ss')}`;
	const logItem = `${datetime}\t${uuid()}\t${msg}\n`;
	try {
		const folderPath = path.join(__dirname, '..', 'logs');
		if (!fs.existsSync(folderPath)) {
			await fsPromises.mkdir(folderPath);
		}

		await fsPromises.appendFile(
			path.join(__dirname, 'logs', fileName),
			logItem
		);
	} catch (error) {
		console.error(error);
	}
};

const logger = (req, _res, next) => {
	logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt');
	console.log(`${req.method} ${req.path}`);
	next();
};

module.exports = { logEvents, logger };
