const fs = require('fs');
const path = require('path');

// move large amounts of data between files in smaller manageable chunks

const rs = fs.createReadStream(
	path.join(__dirname, 'files', 'lorem.txt', { encoding: 'utf8' })
);

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'lorem.txt'));

// rs.on('data', (dataChunk) => {
// 	ws.write(dataChunk);
// });

rs.pipe(ws);
