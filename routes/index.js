const express = require("express");
const router = express.Router();

app.get('/todo', (req, res) => {
  const cols = client.db("deneme").collection("todos")
  cols.find().toArray(function (err, results) {
      if (err) {
          console.log(err);
          res.send([]);
          return
      }
      res.send(results);
  })
})

app.post('/addTodo', (req, res) => {
  const col = client.db('deneme').collection('todos')
  var todo = req.body.todo;
  col.insertOne({ title: todo }, function (err, results) {
      if (err) {
          console.log(err);
          res.send('');
          return
      }
      res.send(results.ops[0]);
  })
})

app.post('/deleteTodo', (req, res) => {
  const collection = client.db('deneme').collection('todos')
  // remove document by its unique _id
  collection.removeOne({ '_id': mongo.ObjectID(req.body.todoID) }, function (err, results) {
      if (err) {
          console.log(err)
          res.send('')
          return
      }
      res.send() // return
  })
})

module.exports = router
