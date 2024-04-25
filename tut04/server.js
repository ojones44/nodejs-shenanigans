const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const { logEvents } = require('./logEvents');
const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.on('log', (msg) => logEvents(msg));

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
	console.log({ url: req.url, method: req.method });

	// example of basic long-hand server code to render an index file with css

	let filepath;

	const render = (statusCode, contentType, folder, file) => {
		res.statusCode = statusCode;
		res.setHeader('Content-Type', contentType);
		filepath = path.join(__dirname, folder, file);
		fs.readFile(filepath, 'utf8', (err, data) => {
			res.end(data);
		});
	};

	if (req.url === '/') {
		render(200, 'text/html', 'views', 'index.html');
		emitter.emit('log', `${filepath} | ${req.method}`);
	} else if (req.url === '/css/index.css') {
		render(200, 'text/css', 'css', 'index.css');
		emitter.emit('log', `${filepath} | ${req.method}`);
	}

	// const extension = path.extname(req.url);
	// console.log(extension);

	// let contentType;

	// switch (extension) {
	// 	case '.js':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	case '.css':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	case '.json':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	case '.jpg':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	case '.png':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	case '.txt':
	// 		contentType = 'text/javascript';
	// 		break;
	// 	default:
	// 		contentType = 'text/html';
	// }
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
