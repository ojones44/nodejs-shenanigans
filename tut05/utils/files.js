const fs = require('fs');

exports.writeDataToFile = (filename, content) => {
	fs.writeFileSync(filename, JSON.stringify(content), 'utf-8', (err) => {
		if (err) console.log(err);
	});
};
