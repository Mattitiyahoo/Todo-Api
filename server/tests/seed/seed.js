const {ObjectID} = require('mongodb');
const {Todo} = require('../../models/Todo');
const {User} = require('../../models/User');
const jwt = require('jsonwebtoken');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
  }).then(() => done());
};

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'myEmail@email.com',
  password: 'buttCheeks',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id:userOneId, access:'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'myEmail2@email.com',
  password: 'buttCheeks2',
}];

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};


module.exports = {
  todos,
  populateTodos,
  users,
  populateUsers
};
