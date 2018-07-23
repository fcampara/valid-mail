const
  admin = require('firebase-admin'),
  serviceAccount = require('../config/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://sbarros-6e050.firebaseio.com'
})

admin.firestore().settings({
  timestampsInSnapshots: true
})

const db = module.exports = admin.firestore() // es-lint-disable-line
