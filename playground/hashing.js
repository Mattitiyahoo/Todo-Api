const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var secret = '123abc';

var data = {
  id: 10
}

var token = jwt.sign(data, secret);
console.log(token);
var decoded = jwt.verify(token, secret);
console.log(`decoded`, decoded);

// var message = 'I am a handsome, healthy, friendly boy';
// var hash = SHA256(message).toString();
//
// console.log(`message: ${message}`);
// console.log(`hash: ${hash}`)
//
// var data = {
//   id: 4
// };
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'SomeSecret').toString()
// };
//
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'SomeSecret').toString();
// if(resultHash === token.hash) {
//   console.log('data was not changed');
// } else {
//   console.log('data was tampered with');
// }
