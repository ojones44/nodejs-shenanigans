const fsPromises = require('fs').promises;
const path = require('path');

// cleaner code with asyncs await syntax
const fileOps = async () => {
	try {
		const data = await fsPromises.readFile(
			path.join(__dirname, 'files', 'hello.txt'),
			'utf8'
		);
		console.log(`📑 ${data}\n`);

		await fsPromises.unlink(path.join(__dirname, 'files', 'hello.txt'));

		await fsPromises.writeFile(
			path.join(__dirname, 'files', 'promiseWrite.txt'),
			data
		);

		await fsPromises.appendFile(
			path.join(__dirname, 'files', 'promiseWrite.txt'),
			'\n\nAppending PROMISES file!'
		);

		await fsPromises.rename(
			path.join(__dirname, 'files', 'promiseWrite.txt'),
			path.join(__dirname, 'files', 'promiseComplete.txt')
		);

		const newData = await fsPromises.readFile(
			path.join(__dirname, 'files', 'promiseComplete.txt'),
			'utf8'
		);
		console.log(`✅ ${newData}\n`);
	} catch (error) {
		console.error(error);
	}
};

fileOps();

// // using path module is safer than hard-coding because some operating systems use \ and some use /
// fs.readFile(path.join(__dirname, 'files', 'hello.txt'), 'utf8', (err, data) => {
// 	if (err) throw err;
// 	console.log(`📑 ${data}\n`);
// });

// // demonstrate that functions and methods in Node are asynchronous
// console.log('🚀 Outside of setTimeout\n');

// // demonstrate that a small delay will result in data being delivered first
// setTimeout(() => {
// 	console.log('🦞 Inside of setTimeout\n');
// }, 50);

// ! Calback hell
// // in writefile, you do not need utf8 as this is defaul behaviour
// const writeText = 'Ohhhhhh yes, top secret Node stuff';

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), writeText, (err) => {
// 	if (err) throw err;
// 	console.log('💾 Write file complete!\n');

// 	// append file will add to an existing file but will also create a new one if it doesn't exist
// 	const append = '\n\nAppending text.';

// 	fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), append, (err) => {
// 		if (err) throw err;
// 		console.log('💾 Append file complete!\n');

// 		fs.rename(
// 			path.join(__dirname, 'files', 'reply.txt'),
// 			path.join(__dirname, 'files', 'renamed.txt'),
// 			(err) => {
// 				if (err) throw err;
// 				console.log('File renamed!\n');
// 			}
// 		);
// 	});
// });

// exit on uncaught errors
process.on('uncaughtException', (err) => {
	console.error(`Oh no! Something went wrong: ${err}`);
	process.exit(1);
});
