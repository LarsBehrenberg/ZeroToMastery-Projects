const http = require('http')

const server = http.createServer((request, response) => {
    response.end('<h1>Hello</h1>')
})

server.listen(3000)