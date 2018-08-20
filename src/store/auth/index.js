import Firebase from 'firebase/app'

export default {
  namespaced: true,

  state: {
    user: {},
    message: {
      error: '',
      success: ''
    }
  },

  getters: {
    user (state) {
      const { user } = state
      return {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        phoneNumber: user.phoneNumber
      }
    },

    isAuthenticated (state) {
      return !!state.user
    }
  },

  mutations: {
    SET_USER (state, payload) {
      let user = payload
      state.user = user
    },

    RESET_USER (state) {
      state.user = null
    },

    SET_MESSAGE_ERROR (state, payload) {
      switch (payload.code) {
        case 'auth/user-not-found':
          state.message = {
            type: 1,
            error: 'Usuário não encontrado'
          }
          break

        case 'auth/wrong-password':
          state.message = {
            type: 2,
            error: 'Senha incorreta'
          }
          break
      }
    }
  },

  actions: {
    async signInWithEmail ({ commit, state }, payload) {
      let email = payload.email
      let password = payload.password

      await Firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        commit('SET_USER', user)
      }).catch(error => {
        commit('SET_MESSAGE_ERROR', error)
        throw state.message
      })
    },

    async signInWithPopup ({ commit }, payload) {
      Firebase.auth().languageCode = 'pt'
      const provider = payload === 'google' ? new Firebase.auth.GoogleAuthProvider() : new Firebase.auth.FacebookAuthProvider()

      Firebase.auth().signInWithPopup(provider).then((result) => {
        commit('SET_USER', result.user)
      }).catch((error) => {
        throw error
      })
    },

    async signOut ({ commit }) {
      await Firebase.auth().signOut().then(() => {
        commit('SET_USER', {})
      })
    }
  }
}
