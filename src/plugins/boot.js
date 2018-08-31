import Firebase from 'firebase/app'

export default ({ app, router, Vue, store }) => {
  Firebase.auth().onAuthStateChanged(user => {
    if (user) {
      store.commit('auth/SET_USER', user)
      router.replace({ name: 'home' })
      new Vue(app) /* eslint-disable-line no-new */
    } else {
      store.commit('auth/RESET_USER')
      router.replace({ name: 'auth' })
      new Vue(app) /* eslint-disable-line no-new */
    }
  })
}
