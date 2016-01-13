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
  userVote.innerText = `Your vote is: ${message} and it has been logged! Thanks for VOTING!`;
})

socket.on('voteCount', (votes) => {
  currentVotes.innerText = `Vote A: ${votes["A"]}
   Vote B: ${votes["B"]}
   Vote C: ${votes["C"]}
   Vote D: ${votes["D"]}`
})

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function () {
    socket.send('voteCast', this.innerText)
  })
}
