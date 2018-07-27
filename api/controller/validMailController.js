const verifier = require('email-verify')
const db = require('../config/db.conf')
const validation = require('../helper/validation.js')

module.exports = {
  list: (data, callback) => {
    const { list, user, name } = data
    let resp = {status: 200, msg: 'Sua lista está sendo válidada', error: null}

    const errorL = validation.arrayList(list)
    if (errorL) {
      resp = {status: 400, msg: 'É obrigatório enviar uma lista para ser válidado.', error: errorL}
      return callback(resp)
    }

    const errorU = validation.userList(user)
    if (errorU) {
      resp = {status: 400, msg: 'Usuário não informado.', error: errorU}
      return callback(resp)
    }

    const errorN = validation.nameList(name)
    if (errorN) {
      resp = {status: 400, msg: 'Nome do arquivo não informado.', error: errorN}
      return callback(resp)
    }

    callback(resp)
    listValidation({list, user, name})
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

async function listValidation ({list, user, name}) {
  let keys = ['sysInfo', 'sysValid']
  for (let k in list[0]) keys.push(k)

  let
    listValid = [],
    details = {
      createdAt: Date.now(),
      nameFile: name,
      length: list.length,
      invalid: 0,
      valid: 0,
      keys: keys
    }

  for (let item of list) {
    let array = Object.values(item)
    let email = array.find((element) => {
      if (element.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) {
        return element
      }
    })

    let {valid, invalid, sysInfo, sysValid} = await validationMail(email)
    details.valid += valid
    details.invalid += invalid
    item.sysInfo = sysInfo
    item.sysValid = sysValid

    listValid.push(item)
  }
  db.collection('validations').add({
    uid: user.uid,
    user: user,
    details: details,
    valid: listValid,
    beforeValid: list
  }).then().catch(err => {
    saveError(err, user, list, listValid)
  })
}

async function validationMail (email) {
  let validation = await new Promise(resolve => {
    let result = {
      sysValid: '',
      sysInfo: '',
      invalid: 0,
      valid: 0
    }
    if (email) {
      verifier.verify(email, (err, info) => {
        result.sysValid = info.success
        info.success ? result.valid++ : result.invalid++
        const error = err ? `Inválido: ${err}` : ''
        result.sysInfo = error
        resolve(result)
      })
    } else {
      result.invalid++
      result.sysValid = false
      result.sysInfo = 'Formato de e-mail inválido'
      resolve(result)
    }
  })

  return validation
}

function saveError (err, user, list, listValid) {
  db.collection('error').add({
    error: err,
    user: user,
    list: list,
    listValid: listValid
  })
}
