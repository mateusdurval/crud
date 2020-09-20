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

//___________________________________  TABLE USERS ________________________________________

//** lists all users in the user table */
app.get('/', (req, res) => {
    db.collection('users').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('users/index.ejs', {data: results, title: 'CRUD - Usuários'})
    })    
})
//** get total users from db (for ajax request's) */
app.get('/users/total', (req, res) => {
    db.collection('users').find().count((err, result) => {
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
//** return form view for to edit */
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

    var cep = req.body.cep
    var city = req.body.city
    var state = req.body.state
    var district = req.body.district
    var street = req.body.street
    var number = req.body.number

    db.collection('users').updateOne({_id: ObjectId (id)}, {
        $set: {
            name: name,
            age: age,
            phone: phone,
            cpf: cpf,
            rg: rg,
            address: address,
            cep: cep,
            city: city,
            state: state,
            district: district,
            street: street,
            number: number
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

//___________________________________ TABLE PRODUCTS ________________________________________

/** lists all users in the user table */
app.route('/products').get((req, res) => {
    db.collection('products').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('products/index.ejs', {data: results, title: 'CRUD - Produtos'})
    }) 
})
//** get total users from db (for ajax request's) */
app.get('/products/total', (req, res) => {
    db.collection('products').find().count((err, result) => {
        res.status(200).send((result).toString())
    })
})
/** return view create */
app.route('/products/create').get((req, res) => {
    res.render('products/create.ejs', {title: 'Cadastro de Produtos'})
})
/** insert on db */
app.route('/products/insert').post((req, res) => {
    db.collection('products').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/products')
    })
    console.log(req.body)
})
/** retorn view form for to edit */
app.route('/products/edit/:id').get((req, res) => {
    var id = req.params.id
    console.log(id)
    db.collection('products').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

        console.log(result)

        res.render('products/edit.ejs', {product: result, title: 'Editar usuário'})
    })
})
/** update user on db */
app.route('/products/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var name = req.body.name
    var model = req.body.model
    var brand = req.body.brand
    var ean = req.body.ean
    var made = req.body.made
    var serial_number = req.body.serial_number

    db.collection('products').updateOne({_id: ObjectId (id)}, {
        $set: {
            name: name,
            model: model,
            brand: brand,
            ean: ean,
            made: made,
            serial_number: serial_number
        }
    }, (err, result) => {
        if (err) return res.send(err)
        res.redirect('/products')
        console.log('Atualizado com sucesso!')
    })
})
/** delete user by ID */
app.route('/products/destroy/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('products').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})

//___________________________________ TABLE COURSE ________________________________________

// return view index and list all users from db
app.route('/course').get((req, res) => { 
    db.collection('course').find().toArray((err, results) => {
        console.log(results)
        if (err) return console.log(err)
        res.render('course/index.ejs', {data: results, title: 'CRUD - Aulas'})
    }) 
})
//** get total users from db (for ajax request's) */
app.get('/course/total', (req, res) => {
    db.collection('course').find().count((err, result) => {
        res.status(200).send((result).toString())
    })
})
/** return view form for to create*/
app.route('/course/create').get((req, res) => {
    res.render('course/create.ejs', {title: 'Cadastrar Aula'})
})
/** insert couse on db */
app.route('/course/insert').post((req, res) => {
    db.collection('course').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/course')
    })
    console.log(req.body)
})
/** return view form for to edit*/
app.route('/course/edit/:id').get((req, res) => {
    var id = req.params.id
    console.log(id)
    db.collection('course').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

        console.log(result)

        res.render('course/edit.ejs', {course: result, title: 'Editar usuário'})
    })
})
/** update user on db */
app.route('/course/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var materia = req.body.materia
    var meeting = req.body.meeting
    var time = req.body.time
    var professor = req.body.professor
    var group = req.body.group
    var qtd_students = req.body.qtd_students

    db.collection('course').updateOne({_id: ObjectId (id)}, {
        $set: {
            materia: materia,
            meeting: meeting,
            time: time,
            professor: professor,
            group: group,
            qtd_students: qtd_students
        }
    }, (err, result) => {
        if (err) return res.send(err)
        console.log('Atualizado com sucesso!')
        res.redirect('/course')
    })
})
/** delete user by ID */
app.route('/course/destroy/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('course').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})



