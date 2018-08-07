let connectedUsers = []
module.exports = {
  start: (io) => {
    io.of('/validMail').on('connect', (socket) => {
      socket.on('setUser', (user) => {
        console.log(socket.id)
        connectedUsers.push({
          uid: user.uid,
          name: user.name,
          socketId: socket.id
        })
      })
    })
  },
  getUserById: (id) => {
    return connectedUsers.find(user => user.uid === id)
  }
}
