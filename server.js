// server.js
const http = require('http')
const express = require('express')
const socketIo = require('socket.io')
const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

const port = process.env.PORT || 3000

const server = http.createServer(app)
                 .listen(port, () => {
                    console.log('Listening on port ' + port + '.')
                  })

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('A user has connected.', io.engine.clientsCount)

  io.sockets.emit('usersConnected', io.engine.clientsCount)

  socket.emit('statusMessage', 'You have connected.');

  socket.on('disconnect', () => {
    console.log('A user has disconnected.', io.engine.clientsCount)
    io.sockets.emit('usersConnected', io.engine.clientsCount)
  })
})

module.exports = server
