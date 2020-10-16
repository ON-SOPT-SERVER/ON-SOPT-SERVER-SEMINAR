const crypto = require('crypto');

const password = '123123';
const password2 = '12312';
const base64 = crypto.createHash('sha512').update(password).digest('base64');
const base64_ = crypto.createHash('sha512').update(password2).digest('base64');
const hex = crypto.createHash('sha512').update(password).digest('hex');

console.log(base64);
console.log(base64_);
console.log(hex);