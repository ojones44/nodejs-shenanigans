const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

// common core modules
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (msg) => {
	const datetime = `${format(new Date(), 'yyyyMMdd @HH:mm:ss')}`;
	const logItem = `${datetime}\t${uuid()}\t${msg}}`;
	console.log(logItem);
	try {
		await fsPromises.appendFile(
			path.join(__dirname, 'logs', 'eventLog.txt'),
			logItem
		);
	} catch (error) {
		console.error(error);
	}
};

module.exports = { logEvents };
