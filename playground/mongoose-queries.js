const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

var id = '5a5cf16869bf7be02ef797eb';
var invalidId = '5a5cf16869bf7be02ef797eb11';

var userId = '5a5c07e546c103a018b66e2d';
var nonExistUserId = '6a5c07e546c103a018b66e2d';
var invalidUserId = '5a5c07e546c103a018b66e2d11';
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('Ya shmucked up');
  }
  console.log(user);
}, (e) => {
  console.log('There was an error!');
});
 
User.findById(nonExistUserId).then((user) => {
  if (!user) {
    return console.log('Ya shmucked up');
  }
  console.log(user);
}, (e) => {
  console.log('There was an error!');
});

User.findById(invalidUserId).then((user) => {
  if (!user) {
    return console.log('Ya shmucked up');
  }
  console.log(user);
}, (e) => {
  console.log('There was an error!');
});

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todos) => {
//   console.log('Todo', todos);
// });
//
// Todo.findById(id).then((todos) => {
//   if (!todos) {
//     return console.log('SHMUCK!');
//   }
//   console.log('Todo by ID', todos);
// });
//
// if (!ObjectID.isValid(invalidId)) {
//   return console.log('Id not valid, shmass hole');
// };
//
// Todo.findById(invalidId).then((todos) => {
//   if (!todos) {
//     return console.log('SHMUCK!');
//   }
//   console.log('Todo by ID', todos);
// }).catch((e) => {
//   console.log(e);
// });
