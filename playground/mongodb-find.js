//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB Server');
  }
  console.log('Successfully connected to MongoDB Server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a5bef68fa36762550ca6aea')
  // }).toArray().then((docs) => {
  //   console.log('Todos: ');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch Todos: ', err);
  // });

  db.collection('Users').find({name: 'Dan'}).toArray().then((docs) => {
    console.log(`Users:`);
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch Todos: ', err);
  });

  //db.close();
 });
