require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/Todo');
var {User} = require('./models/User');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((todo) => {
    res.send({
      code: 'Inserted',
      todo
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      code: 'Returned',
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send({
      code: 'Return Failed - invalid id',
      message: 'Invalid Todo Id'
    });
  }

  Todo.findById(req.params.id).then((todo) => {
    if (!todo) {
      res.status(404).send({
        code: 'Return Failed - nonexistant id',
        message: 'No Todo found'
      });
    } else {
      res.send({
        code: 'Returned',
        todo
      });
    }
  }, (e) => {
    res.status(400).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.delete('/todos/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send({
      code: 'Delete Failed - invalid id',
      message: 'Invalid Todo Id'
    });
  }

  Todo.findByIdAndRemove(req.params.id).then((todo) => {
    if (!todo) {
      res.status(404).send({
        code: 'Delete  Failed - nonexistant id',
        message: 'No Todo found'
      });
    } else {
      res.send({
        code: 'Deleted',
        todo
      });
    }
  }, (e) => {
    res.status(400).send();
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id', (req, res) => {
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(req.params.id)) {
    res.status(404).send({
      code: 'Update Failed - invalid id',
      message: 'Invalid Todo Id'
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(req.params.id, {
      $set: body
    }, {
      new: true
    }).then((todo) => {
      if (!todo) {
        res.status(404).send({
          code: 'Update Failed - nonexistant id',
          message: 'No Todo found'
        });
      } else {
        res.send({
          code: 'Updated',
          todo
        });
      }
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('X-Auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
