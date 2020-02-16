const express = require ('express')
const app = express()
const cors = require ('cors')

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
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
        res.json(database.users[0])
    } else {
        res.status(400).json("error logging in")
    }
})

//  /register - POST = user
app.post('/register', (req, res) => {
    const { name, password, email } = req.body
    database.users.push({
        id: 12,
        name: name,
        password: password,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

// /profile/:UserID - GET = user
app.get('/profile/:id', (req, res) => {

    let userFound = false

    database.users.forEach(user => {
        if (user.id == req.params.id){
            userFound = true
            return res.json(user)
        }
    })

    if(!userFound){
        res.status(400).json('user not found')
    }
}) 


// /image - PUT = put up a counter to change rankings
app.put('/image', (req, res) => {
    let userFound = false

    console.log(res)

    database.users.forEach(user => {
        if (user.id == req.body.id){
            userFound = true
            user.entries++
            return res.json(user.entries)
        }
    })

    if(!userFound){
        res.status(400).json('user not found, entries cannot be incremented')
    }
})


app.listen(4000, () => {
    console.log("app is running on port 4000")
})



/*
Different paths, that need to be configured:



*/