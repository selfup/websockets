'use strict'

const socket = io()
const currentVotes = document.getElementById('current-votes');
const userVote = document.getElementById('user-vote');
const connectionCount = document.getElementById('connection-count')
const buttons = document.querySelectorAll('#choices button');
const statusMessage = document.getElementById('status-message')

socket.on('usersConnected', (count) => {
  connectionCount.innerText = 'Connected Users: ' + count
})

socket.on('statusMessage', (message) => {
  statusMessage.innerText = message
})

socket.on('userVote', (message) => {
  userVote.innerText = `Your vote is: ${message}`;
})

socket.on('voteCount', (votes) => {
  currentVotes.innerText = `A: ${votes["A"]}, B: ${votes["B"]}, C: ${votes["C"]}, D: ${votes["D"]}`
})

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText)
  })
}
