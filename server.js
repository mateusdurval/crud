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

//***************** CRUD USERS ******************** */

//list all users from table users
app.get('/', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        //var count = db.collection('users').count()
        //console.log(count)
        if (err) return console.log(err)

        res.render('users/index.ejs', {data: results})
    })
})
//return view form create
app.get('/users/create', (req, res) => {
    res.render('users/create')
})
//action create
app.post('/users/insert', (req, res) =>  {
    db.collection('users').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('salvo no banco de dados')
        res.redirect('/')
    })
    console.log(req.body)
})
//return view for update
app.route('/users/edit/:id').get((req, res) => {
    var id = req.params.id
    db.collection('users').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

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
            name: req.params.name,
            age: req.params.age,
            phone: req.params.phone,
            cpf: req.params.cpf,
            rg: req.params.rg,
            address: req.params.address
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/')
        console.log('Atualizado com sucesso!')
    })
})
