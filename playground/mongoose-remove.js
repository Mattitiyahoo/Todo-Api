const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findOneAndRemove({_id: '5a5d046c6436dc5d90d90a27'}).then((result) => {
   console.log(todo);
});

// Todo.findByIdAndRemove('5a5d046c6436dc5d90d90a27').then((todo) => {
//   console.log(todo);
// });
