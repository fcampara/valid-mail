import Firebase from 'firebase/app'
import 'firebase/auth'

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    const authRequired = to.matched.some(route => route.meta.authRequired)
    let currentUser = !!Firebase.auth().currentUser
    if (authRequired) {
      if (currentUser) {
        next()
      } else {
        next({ name: 'auth' })
      }
    } else {
      next()
    }
  })
}
