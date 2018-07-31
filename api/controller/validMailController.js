const verifier = require('email-verify')
const db = require('../config/db.conf')
const validation = require('../helper/validation.js')

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
    let email = item.find(element => {
      if (element.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)) return element
    })

    let {valid, invalid, sysInfo, sysValid} = await validationMail(email)
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
        const error = err ? `Inválido: ${err}` : 'Ok'
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
