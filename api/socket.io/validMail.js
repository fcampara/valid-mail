let connectedUsers = []
module.exports = {
  start: (io) => {
    io.on('connect', (socket) => {
      socket.on('setUser', (user) => {
        console.log('setUser: ', user) // eslint-disable-line
        connectedUsers.push({
          uid: user.uid,
          name: user.name,
          socketId: socket.id
        })
      })
      socket.on('disconnect', () => {
        console.log('Disconnect') // eslint-disable-line
        const index = connectedUsers.findIndex(user => user.socketId === socket.id)
        if (index > -1) connectedUsers.splice(index, 1)
      })
    })
  },
  getUserById: (id) => {
    return connectedUsers.find(user => user.uid === id)
  }
}
