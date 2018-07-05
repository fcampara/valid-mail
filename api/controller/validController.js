const verifier = require('email-verify')

exports.valid = (list, callback) => {
  verifier.verify('felipe_novo2@hotmail.com', (err, info) => {
    if (err) {
      callback(err)
    } else {
      const resp = {success: `Success (T/F): ${info.success}, info: ${info.info}`}
      callback(resp)
    }
  })
}
