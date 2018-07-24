const
  verifier = require('email-verify'),
  db = require('../config/db.conf')

exports.valid = (list, callback) => {
  const resp = 'Sua lista está sendo válidada!'
  callback(resp)
  validation(list)
}

async function validation ({list, user, name}) {
  let keys = ['sys_info', 'sys_valid']
  for (let k in list[0]) keys.push(k)

  let
    listValid = [],
    details = {
      created_at: Date.now(),
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
    await new Promise(resolve => {
      if (email) {
        verifier.verify(email, (err, info) => {
          item.sys_valid = info.success
          if (info.success) {
            details.valid++
          } else {
            details.invalid++
          }
          const error = err ? `Inválido: ${err}` : ''
          item.sys_info = error
          listValid.push(item)
          resolve()
        })
      } else {
        details.invalid++
        item.sys_valid = false
        item.sys_info = 'Formato de e-mail inválido'
        listValid.push(item)
        resolve()
      }
    })
  }
  db.collection('list').add({
    user: user,
    details: details,
    valid: listValid,
    beforeValid: list
  }).then().catch(err => {
    saveError(err, user, list, listValid)
  })
}

function saveError (err, user, list, listValid) {
  db.collection('error').add({
    error: err,
    user: user,
    list: list,
    listValid: listValid
  })
}
