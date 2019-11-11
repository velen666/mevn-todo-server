const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const uri = require('./config/config').mongoURI

const PORT = process.env.PORT || 8081

const app = express()

const mongo = require('mongodb')
const MongoClient = mongo.MongoClient
//const uri = "mongodb+srv://mevnuser:mevn1234@mevnstack-j8zwo.mongodb.net/test?retryWrites=true"
var client;
var mongoClient = new MongoClient(uri, {
    reconnectTries: Number.MAX_VALUE,
    autoReconnect: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoClient.connect((err, db) => {
    if (err != null) {
        console.log(err)
        return
    } else {
      console.log('DB connection successfuly')
    }
    client = db
})

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

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

// client 8080 server 8081'de çalışacak
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
