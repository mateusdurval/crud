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
        if (err) return console.log(err)
        res.render('users/index.ejs', {data: results, title: 'CRUD - Usuários'})
    })    
})
//** get total users from db */
app.get('/users/total', (req, res) => {
    db.collection('users').find().count((err, result) => {
        console.log(result)
        res.status(200).send((result).toString())
    })
})

//** returns form view for insertion */
app.get('/users/create', (req, res) => {
    res.render('users/create', {title: 'Cadastrar usuário'})
})
//** insert user in the database */
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

        res.render('users/edit.ejs', {user: result, title: 'Editar usuário'})
    })
})
//** edit user in database */
app.route('/users/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var name = req.body.name
    var age = req.body.age
    var phone = req.body.phone
    var cpf = req.body.cpf
    var rg = req.body.rg
    var address = req.body.address

    db.collection('users').updateOne({_id: ObjectId (id)}, {
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
    })
})
/** delete user by ID */
app.route('/users/delete/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('users').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})
