const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!'

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  })
});

var hashedPassword = '$2a$10$McEzdXk3uL7M2gGY/CMfKe2UsMyfjWmmRmdsKfc3htQ6Vdr5yo4iC';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// var secret = '123abc';
//
// var data = {
//   id: 10
// }
//
// var token = jwt.sign(data, secret);
// console.log(token);
// var decoded = jwt.verify(token, secret);
// console.log(`decoded`, decoded);

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
