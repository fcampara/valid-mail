export function connect ({ commit }) {
  const io = require('socket.io-client')
  const url = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/validMail' : 'http://valid-mail.herokuapp.com/validMail'
  commit('SET_SOCKET', io.connect(url))
}

export function setMessage ({ commit }, { cont, length, name, email, save, info }) {
  if (email) commit('SET_MESSAGES_EMAIL', { email, info })
  if (save) commit('SET_MESSAGES_SAVE', { save })
  commit('SET_INFO', { cont, length, name })
}

export function resetMessages ({ commit }) {
  commit('RESET_MESSAGES')
}
