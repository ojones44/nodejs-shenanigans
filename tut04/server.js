const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;

const { logEvents } = require('./logEvents');
const EventEmitter = require('events');

const emitter = new EventEmitter();
emitter.on('log', (msg, fileName) => logEvents(msg, fileName));

const PORT = process.env.PORT || 5000;

const serveFile = async (filepath, contentType, response) => {
	try {
		const rawData = await fsPromises.readFile(
			filepath,
			!contentType.includes('image') ? 'utf8' : ''
		);
		const data =
			contentType === 'application/json' ? JSON.parse(rawData) : rawData;
		response.writeHead(!filepath.includes('404') ? 200 : 404, {
			'Content-Type': contentType,
		});
		response.end(
			contentType === 'application/json' ? JSON.stringify(data) : data
		);
	} catch (error) {
		console.log(error);
		emitter.emit('log', `${error.name}: ${error.message}`, 'errorLog.txt');
		response.statusCode = 500;
		response.end();
	} finally {
	}
};

const server = http.createServer((req, res) => {
	console.log({ url: req.url, method: req.method });
	emitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

	const extension = path.extname(req.url);
	let contentType;

	switch (extension) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.json':
			contentType = 'application/json';
			break;
		case '.jpg':
			contentType = 'image/jpeg';
			break;
		case '.png':
			contentType = 'image/png';
			break;
		case '.txt':
			contentType = 'text/plain';
			break;
		default:
			contentType = 'text/html';
	}

	let filepath =
		contentType === 'text/html' && req.url === '/'
			? path.join(__dirname, 'views', 'index.html')
			: contentType === 'text/html' && req.url.slice(-1) === '/'
			? path.join(__dirname, 'views', req.url, 'index.html')
			: contentType === 'text/html'
			? path.join(__dirname, 'views', req.url)
			: path.join(__dirname, req.url);

	// removes the need for file extension in url
	if (!extension && req.url.slice(-1) !== '/') filepath += '.html';

	const fileExits = fs.existsSync(filepath);

	if (fileExits) {
		serveFile(filepath, contentType, res);
	} else {
		// send 404 or 301
		switch (path.parse(filepath).base) {
			case 'old-page.html':
				res.writeHead(301, { Location: '/new-page.html' });
				res.end();
				break;

			case 'www-page.html':
				res.writeHead(301, { Location: '/' });
				res.end();
				break;

			default:
				serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
				break;
		}
	}
});

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
