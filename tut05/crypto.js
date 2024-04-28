const crypto = require('crypto');

// creat hash
const hash = crypto.hash('sha256');
hash.update('password1234');
console.log(hash.diest('hex'));
