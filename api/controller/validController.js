const verifier = require('email-verify')

exports.valid = (list, callback) => {
  verifier.verify('felipe_novo2@hotmail.com', (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log(`Success (T/F): ${info.success}`)
      console.log(`Info: ${info.info}`)
    }
  })
}
