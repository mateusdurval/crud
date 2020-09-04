const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const { ObjectId } = require('mongodb')

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
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

// CRUD users  */

//** lists all users in the user table */
app.get('/', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        //var count = db.collection('users').count()
        //console.log(count)
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
    db.collection('users').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

<<<<<<< HEAD
    db.collection('users').find(Object(id)).toArray((err, result) => {
        if (err) return res.send(err)
        console.log(result.name)
        res.render('/users/edit', {user: result})
=======
        res.render('users/edit.ejs', {user: result})
    })
})

app.route('/users/update').post((req, res) => {
    console.log(req.params.phone)
    var id = req.params.id
    var name = req.params.name
    var age = req.params.age
    var phone = req.paramas.phone
    var cpf = req.paramas.cpf
    var rg = req.paramas.rg
    var address = req.paramas.address

    db.collection('users').updateOne({_id: ObjectId(id)}, {
        $set: {
            name: name,
            age: age,
            phone: phone,
            cpf: cpf,
            rg: rg,
            address: address
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/')
        console.log('Atualizado com sucesso!')
>>>>>>> 6b7caa56a84e7eb20401d7f7efaea28a18e49d5d
    })
})
