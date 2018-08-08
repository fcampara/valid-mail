const validation = require('../helper/validation.js')
const verifier = require('email-verify')
const db = require('../config/db.conf')
const { app } = require('../config/app.conf')
const validMailSocket = require('../socket.io/validMail')

module.exports = {
  list: (data, callback) => {
    const { file, user } = data
    let resp = {status: 200, msg: 'Sua lista está sendo válidada', error: null}

    const errorL = validation.file(file)
    if (errorL) {
      resp = {status: 400, msg: 'Está faltando alguma informação do arquivo, tente novamente', error: errorL}
      return callback(resp)
    }

    const errorU = validation.user(user)
    if (errorU) {
      resp = {status: 400, msg: 'Usuário não informado.', error: errorU}
      return callback(resp)
    }

    listValidation(file, user)
    return callback(resp)
  },

  single: async ({email}, callback) => {
    const errorE = validation.email(email)
    if (errorE) {
      const resp = {status: 400, msg: 'E-mail com formato incorreto', valid: false, error: errorE}
      return callback(resp)
    } else {
      const {sysValid} = await validationMail(email)
      const msg = sysValid ? `${email} é um e-mail válido` : `${email} é um e-mail inválido`
      const resp = {status: 200, msg: msg, valid: sysValid, error: null}
      return callback(resp)
    }
  }
}

async function listValidation ({name, data, header}, user) {
  // console.log(app.io)
  let cont = 0
  header.unshift('sysInfo', 'sysValid')
  let
    listValid = {data: [], header: header},
    details = {
      createdAt: Date.now(),
      nameFile: name,
      length: data.length,
      invalid: 0,
      valid: 0,
      seconds: 0
    }
  const begin = Date.now()
  for (let item of data) {
    cont++
    let email = item.find(element => {
      if (element) {
        if (element.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) return element
      }
    })
    let {valid, invalid, sysInfo, sysValid} = await validationMail(email, cont, user.uid)
    details.valid += valid
    details.invalid += invalid
    item.unshift(sysInfo, sysValid)

    let newItem = {}
    for (let value of item.entries()) {
      const header = listValid.header[value[0]]
      newItem[header] = value[1]
    }

    listValid.data.push(newItem)
  }
  const end = Date.now()
  details.seconds = (end - begin) * 0.001
  db.collection('validations').add({
    uid: user.uid,
    user: user,
    details: details,
    valid: listValid
  }).then().catch(err => {
    saveError(err)
  })
}

async function validationMail (email, cont, uid) {
  const socket = validMailSocket.getUserById(uid)
  let verifierMail = await new Promise(resolve => {
    if (email) {
      verifier.verify(email,{timeout: 30000}, (err, info) => { // eslint-disable-line
        let valid = 0, invalid = 0
        info.success ? valid++ : invalid++
        resolve({ invalid: invalid, valid: valid, sysValid: info.success, sysInfo: info.code })
      })
    } else {
      resolve({ invalid: 1, valid: 0, sysValid: false, sysInfo: 2 })
    }
  })
  verifierMail.sysInfo = validation.verifyCode(verifierMail.sysInfo)
  if (socket) {
    app.io.to(socket.socketId).emit('message', {info: verifierMail, email: email})
  }
  console.log(verifierMail, email, cont) // eslint-disable-line
  return verifierMail
}

function saveError (err, user, list, listValid) {
  db.collection('error').add({
    error: err,
    user: user,
    list: list,
    listValid: listValid
  })
}
