const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(() => {
    res.send(todo);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      code: 'Cool Code',
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send({
      code: 'Cool Code',
      message: 'Invalid Todo Id'
    });
  }

  Todo.findById(req.params.id).then((todos) => {
    if (!todos) {
      res.status(404).send({
        code: 'Cool Code',
        message: 'No Todo found'
      });
    } else {
      res.send({
        code: 'Cool Code',
        todos
      });
    }
  }, (e) => {
    res.status(400).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = {app};
