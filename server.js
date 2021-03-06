const express = require('express')
const app = express()
const bodyParser = require('body-parser')
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
//___________________________________ TABLE MEDICINE ________________________________________

// return view index and list all consults from db
app.route('/medicine').get((req, res) => { 
    db.collection('medicine').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('medicine/index.ejs', {data: results, title: 'CRUD - Medicine'})
    }) 
})
//** get total consults from db (for ajax request's) */
app.get('/medicine/total', (req, res) => {
    db.collection('medicine').find().count((err, result) => {
        res.status(200).send((result).toString())
    })
})
/** return view form for to create*/
app.route('/medicine/create').get((req, res) => { 
    res.render('medicine/create.ejs', {title: 'Cadastrar consulta'})
})
/** insert consult in db */
app.route('/medicine/insert').post((req, res) => { 
    db.collection('medicine').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/medicine')
    })
    console.log(req.body)
})
/** return view form for to edit*/
app.route('/medicine/edit/:id').get((req, res) => {
    var id = req.params.id
    console.log(id)
    db.collection('medicine').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

        console.log(result)

        res.render('medicine/edit.ejs', {medicine: result, title: 'Editar consulta'})
    })
})
/** update consulta on db */
app.route('/medicine/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var name_paciente = req.body.name_paciente
    var medico = req.body.medico
    var date = req.body.date
    var time = req.body.time
    var especializacao = req.body.especializacao

    db.collection('medicine').updateOne({_id: ObjectId (id)}, {
        $set: {
            name_paciente: name_paciente,
            medico: medico,
            date: date,
            time: time,
            especializacao: especializacao
        }
    }, (err, result) => {
        if (err) return res.send(err)
        console.log('Atualizado com sucesso!')
        res.redirect('/medicine')
    })
})

app.route('/medicine/destroy/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('medicine').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})

//___________________________________ TABLE STUDENTS ________________________________________

app.route('/student').get((req, res) => { 
    db.collection('student').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('student/index.ejs', {data: results, title: 'CRUD - Student'})
    }) 
})
//** get total consults from db (for ajax request's) */
app.get('/student/total', (req, res) => {
    db.collection('student').find().count((err, result) => {
        res.status(200).send((result).toString())
    })
})
/** return view form for to create*/
app.route('/student/create').get((req, res) => { 
    res.render('student/create.ejs', {title: 'Cadastrar consulta'})
})
/** insert consult in db */
app.route('/student/insert').post((req, res) => { 
    db.collection('student').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/student')
    })
    console.log(req.body)
})
/** return view form for to edit*/
app.route('/student/edit/:id').get((req, res) => {
    var id = req.params.id
    console.log(id)
    db.collection('student').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

        console.log(result)

        res.render('student/edit.ejs', {student: result, title: 'Editar consulta'})
    })
})
/** update consulta on db */
app.route('/student/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var name = req.body.name
    var rg = req.body.rg
    var cpf = req.body.cpf
    var registration = req.body.registration
    var course = req.body.course

    db.collection('student').updateOne({_id: ObjectId (id)}, {
        $set: {
            name: name,
            rg: rg,
            cpf: cpf,
            registration: registration,
            course: course
        }
    }, (err, result) => {
        if (err) return res.send(err)
        console.log('Atualizado com sucesso!')
        res.redirect('/student')
    })
})
//delete user by id
app.route('/student/destroy/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('student').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})

//___________________________________ TABLE GAMES ________________________________________

//lists all users
app.get('/jogos', (req, res) => {
    db.collection('jogos').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.render('jogos/index.ejs', {data: results, title: 'CRUD - Jogos'})
    })    
})
//** get total consults from db (for ajax request's) */
app.get('/jogos/total', (req, res) => {
    db.collection('jogos').find().count((err, result) => {
        res.status(200).send((result).toString())
    })
})
//** return view form for to create */
app.route('/jogos/create').get((req, res) => { 
    res.render('jogos/create.ejs', {title: 'Cadastrar Jogo'})
})
//insert game on db
app.route('/jogos/insert').post((req, res) => { 
    db.collection('jogos').save(req.body, (err, result) => {
        if (err) return console.log(err)

        console.log ('Inserted in the database!')
        res.redirect('/jogos')
    })
    console.log(req.body)
})
//return form view for editing
app.route('/jogos/edit/:id').get((req, res) => { 
    var id = req.params.id
    console.log(id)
    db.collection('jogos').find({"_id": ObjectId(id)}).toArray((err, result) => {
        if (err) return console.log(err) 

        console.log(result)

        res.render('jogos/edit.ejs', {jogos: result, title: 'Editar jogo'})
    })
})
//action update on db
app.route('/jogos/update').post((req, res) => {
    console.log('ID:', req.body.id)

    var id = req.body.id
    var name = req.body.name
    var desenvolvedor = req.body.desenvolvedor
    var anolancamento = req.body.anolancamento
    var plataforma = req.body.plataforma
    var preco = req.body.preco

    db.collection('jogos').updateOne({_id: ObjectId (id)}, {
        $set: {
            name: name,
            desenvolvedor: desenvolvedor,
            anolancamento: anolancamento,
            plataforma: plataforma,
            preco: preco
        }
    }, (err, result) => {
        if (err) return res.send(err)
        console.log('Atualizado com sucesso!')
        res.redirect('/jogos')
    })
})
//delete user by id (request ajax)
app.route('/jogos/destroy/:id').get((req, res) => {
    console.log('ID:', req.params.id)
    var id = req.params.id

    db.collection('jogos').deleteOne({_id: ObjectId(id)}, (err, result) => {
        if (err) return res.send(500, err)

        console.log('Deleted user!')
        res.send('success')
    })
})
