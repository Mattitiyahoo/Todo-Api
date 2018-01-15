const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/', (req, res) => {
  res.send('Hi!');
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
