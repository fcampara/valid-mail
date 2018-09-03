import Firebase from 'firebase/app'
import { errorLogin } from './../../statics/error/login.js'
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
    verifyEmail (state) {
      const { user } = state
      return user.emailVerified && user.emailVerified
    },

    currentUser (state) {
      const { user: {displayName, email, uid, photoURL} } = state
      return { displayName, email, uid, photoURL }
    },

    isAuthenticated (state) {
      return !!state.user
    }
  },

  mutations: {
    SET_USER (state, payload) {
      state.user = payload
    },

    RESET_USER (state) {
      state.user = staticUser
    },

    SET_MESSAGE_ERROR (state, { code }) {
      state.message = errorLogin[code]
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

        currentUser.sendEmailVerification()
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

      await Firebase.auth().signInWithPopup(provider).then((result) => {
        commit('SET_USER', result.user)
      }).catch((error) => {
        throw error
      })
    },

    async signOut ({ commit }) {
      await Firebase.auth().signOut().then(() => {
        commit('SET_USER', {})
      })
    },

    verifyEmail () {
      Firebase.auth().languageCode = 'pt-BR'
      const currentUser = Firebase.auth().currentUser
      currentUser.sendEmailVerification()
    },

    async recoveryPassword ({ commit, state }, email) {
      const auth = Firebase.auth()

      await auth.sendPasswordResetEmail(email).then().catch(error => {
        commit('SET_MESSAGE_ERROR', error)
        throw state.message
      })
    }
  }
}
