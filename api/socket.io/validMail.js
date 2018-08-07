let connectedUsers = []
module.exports = {
  start: (io) => {
    io.of('/validMail').on('connect', (socket) => {
      socket.on('setUser', (user) => {
        connectedUsers.push({
          uid: user.uid,
          name: user.name,
          socketId: socket.id
        })
      })
      socket.on('disconnect', () => {
        const index = connectedUsers.findIndex(user => user.socketId === socket.id)
        if (index > -1) connectedUsers.splice(index, 1)
      })
    })
  },
  getUserById: (id) => {
    return connectedUsers.find(user => user.uid === id)
  }
}
