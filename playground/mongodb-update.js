//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Successfully connected to MongoDB Server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a5bfbe7de53117ac440394c')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a5bf03f9fb3572444d4581b')
  }, {
    $inc: {
      age: 2
    },
    $set: {
      name: 'Joe'
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //db.close();
 });
