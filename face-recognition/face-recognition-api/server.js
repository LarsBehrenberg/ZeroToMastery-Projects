const express = require ('express')
const app = express();

app.use(express.json());

const database = {
    users: [{
            id: 123,
            name: 'john123',
            password: "pass",
            email: 'john@gmx.de',
            entries: 0,
            joined: new Date()
        },
        {
            id: 456,
            name: 'peter12',
            password: "peeee",
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
    if(req.body.email === database.users[1].email && req.body.password === database.users[1].password){
        res.json("success")
    } else {
        res.status(400).json("error logging in")
    }
})

//  /register
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

app.listen(3000, () => {
    console.log("app is running on port 3000")
})



/*
Different paths, that need to be configured:

/ - base root
/login - POST = success/fail
/signin - POST = user
/profile/:UserID - GET = user
/image - PUT = put up a counter to change rankings

*/