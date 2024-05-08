const fs = require('fs');

const dirs = ['new', 'test', 'db'];

// dirs.forEach((dir) => {
// 	const path = `./${dir}`;

// 	if (!fs.existsSync(path)) {
// 		fs.mkdir(path, (err) => {
// 			if (err) throw err;
// 			console.log('New directory created');
// 		});
// 	} else {
// 		console.log(`${path} already exists`);
// 	}
// });

dirs.forEach((dir) => {
	const path = `./${dir}`;

	if (fs.existsSync(path)) {
		fs.rmdir(path, (err) => {
			if (err) throw err;
			console.log(`${path} now removed`);
		});
	} else {
		console.log(`${path} doesn't exist`);
	}
});
