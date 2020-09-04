const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

const MongoClient = require('mongodb').MongoClient 
const uri = "mongodb+srv://mateus:159357258@hacknarok.blc0f.mongodb.net/crud?retryWrites=true&w=majority"

MongoClient.connect(uri, {useUnifiedTopology: true}, (err, client) => {
  if (err) return console.log(err)
  db = client.db('crud')

  app.listen(3000, function() {
    console.log('server is running on port 3000')
  })
})

app.set('view engine', 'ejs')

// CRUD users  */

//** lists all users in the user table */
app.get('/', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        if (err) return console.log(err)

        res.render('users/index.ejs', {data: results})
    })
})
//** returns form view for insertion */
app.get('/users/create', (req, res) => {
    res.render('users/create')
})
//** insert in db */
app.post('/users/insert', (req, res) =>  {
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/')
    })
    console.log(req.body)
})
//** returns form view for editing */
app.route('/users/edit/:id').get((req, res) => {
    var id = req.params.id

    db.collection('users').find(Object(id)).toArray((err, result) => {
        if (err) return res.send(err)
        console.log(result.name)
        res.render('/users/edit', {user: result})
    })
})
