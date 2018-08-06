let connectedUsers = []
let socketIo = {}
module.exports = {
  start: (io) => {
    io.of('/validMail').on('connect', onConnect)
  },
  broadCast: (socketId, msg) => {
    socketIo.broadcast.to(socketId).emit('message', msg)
  },
  getUserById: (id) => {
    return connectedUsers.find(user => user.uid === id)
  }
}

function onConnect (socket) {
  socketIo = socket
  socketIo.on('setUser', (user) => {
    connectedUsers.push({
      uid: user.uid,
      name: user.name,
      socketId: socketIo.id
    })
  })
}
