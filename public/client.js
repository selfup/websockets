const socket = io()

const connectionCount = document.getElementById('connection-count')

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count
})

var statusMessage = document.getElementById('status-message')

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message
})
