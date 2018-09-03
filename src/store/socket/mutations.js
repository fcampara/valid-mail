export function SET_SOCKET (state, payload) {
  state.socket = payload
}

export function SET_INFO (state, payload) {
  state.info = payload
}

export function SET_MESSAGES_EMAIL (state, payload) {
  if (state.messages.length === 100) state.messages.shift()
  state.messages.push(payload)
}

export function SET_MESSAGES_SAVE (state, payload) {
  state.messages.push({
    save: payload.save,
    name: state.info.name
  })
}

export function RESET_MESSAGES (state) {
  state.messages = []
}
