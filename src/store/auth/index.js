import Firebase from 'firebase/app'
const staticUser = {
  displayName: '',
  email: '',
  uid: '',
  photoURL: ''
}
export default {
  namespaced: true,

  state: {
    user: staticUser,
    message: {
      error: '',
      success: ''
    }
  },

  getters: {
    currentUser (state) {
      const { user } = state
      return {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL
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
      state.user = staticUser
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

        case 'auth/email-already-in-use':
          state.message = {
            type: 1,
            error: 'Email já está sendo utilizado'
          }
          break

        default:
          state.message = {
            type: 0,
            error: 'Ocorreu um erro inesperado :('
          }
          break
      }
    }
  },

  actions: {
    async signUpWithEmail ({ commit, state }, { email, username, password }) {
      await Firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        const currentUser = Firebase.auth().currentUser

        currentUser.updateProfile({
          displayName: username,
          photoURL: './../statics/kong.png'
        })
      }).catch(error => {
        commit('SET_MESSAGE_ERROR', error)
        throw state.message
      })
    },

    async signInWithEmail ({ commit, state }, { email, password }) {
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
