const fs = require('fs');
const path = require('path');

// move large amounts of data between files in smaller manageable chunks

const rs = fs.createReadStream(path.join(__dirname, 'files', 'lorem.txt'));

const ws = fs.createWriteStream(path.join(__dirname, 'files', 'piped.txt'));

// rs.on('data', (dataChunk) => {
// 	ws.write(dataChunk);
// });

rs.pipe(ws);
