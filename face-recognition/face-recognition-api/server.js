const express = require('express')
const app = express()
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'lars',
        password: '',
        database: 'face-recognition'
    }
});

db.select('*').from('users').then(data => console.log(data))
db.select('*').from('login').then(data => console.log(data))

app.use(express.json())
app.use(cors())

const database = {
    users: [{
            id: '1',
            name: 'john123',
            password: "john",
            email: 'john@gmx.de',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'peter12',
            password: 'peter',
            email: 'peter@gmx.de',
            entries: 0,
            joined: new Date()
        }
    ]
}


// BASE ROOT
app.get('/', (req, res) => {
    res.send(database.users)
})


// /login - POST = success/fail
app.post('/login', (req, res) => {
    const { email, password} = req.body

    db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash)
        console.log(isValid)
        if(isValid){
            res.json(data[0])
        } else {
            res.status(400).json('Email or password is incorrect')
        }
    })
    .catch(err => res.status(400).json('Email or password is incorrect'))

    // if (req.body.email === database.users[0].email &&
    //     req.body.password === database.users[0].password) {
        // res.json(database.users[0])
    // } else {
    //     res.status(400).json("error logging in")
    // }
})

//  /register - POST = user
app.post('/register', (req, res) => {
    const { name, password, email } = req.body
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(user => res.json(user[0]))
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => res.status(400).json('I am very sorry, we were unable to register you.'))
})

// /profile/:UserID - GET = user
app.get('/profile/:id', (req, res) => {

    const { id } = req.params

    db.select('*').from(('users'))
    .returning('*')
    .where({id: id})
    .then( user => {
        if(user.length){
             res.json(user[0])
        } else {
            res.status(400).json('No user found')
        }
    })
    .catch(err => res.status(400).json('Error getting user!'))
})


// /image - PUT = put up a counter to change rankings
app.put('/image', (req, res) => {
    const { id } = req.body

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0])
        })
        .catch(err => res.status(400).json('Error getting entries'))
})


app.listen(4000, () => {
    console.log("app is running on port 4000")
})



/*
Different paths, that need to be configured:



*/