const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');
const {User} = require('./../models/User');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed')

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new Todo', (done) => {
    var text = 'Butt cheeks';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('Should not create todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('Should return a 404 if todo not found', (done) => {
    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('Should return 404 for non-ObjectIDs', (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('Should remove a todo', (done) => {
    request(app)
    .delete(`/todos/${todos[1]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(todos[1]._id.toHexString());
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.findById(todos[1]._id.toHexString()).then((todo) => {
        expect(todo).toNotExist();
        done();
      }).catch((e) => {
        done(e);
      });
    });
  });

  it('Should return a 404 if todo not found', (done) => {
    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('Should return a 404 if todo id is invalid', (done) => {
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });

});

describe('PATCH /todo/:id', () => {
  it('Should update the todo', (done) => {
    request(app)
    .patch(`/todos/${todos[0]._id.toHexString()}`)
    .send({
      completed: true,
      text: 'update update update'
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('update update update');
      expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');
    })
    .end(done);
  });

  it('Should clear completedAt when todo is not completed', (done) => {
    request(app)
    .patch(`/todos/${todos[1]._id.toHexString()}`)
    .send({
      completed: false,
      text: 'update update update'
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe('update update update');
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toNotExist();
    })
    .end(done);
  });
});

describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('X-Auth', users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body._id).toEqual(undefined);
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var email = 'example@email.com';
    var password = 'abc123talktome';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toExist();
        expect(res.body._id).toExist();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        });
      });
  });

  it('should return validation errors if request invalid', (done) => {
    var email = 'example2@email.com';
    var password = '123';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
      .post('/users')
      .send({email: users[0].email, password: 'Shmuck You!'})
      .expect(400)
      .end(done);
  });
});
