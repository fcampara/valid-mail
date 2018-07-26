const app = require('../api/config/app.conf.js')
const validMail = require('../api/controller/validMailController.js')

app.post('/api/validation/list', (req, res) => {
  validMail.list(req.body, resp => {
    const error = resp.error ? resp.error.details : null
    res.status(resp.status).json({msg: resp.msg, error: error})
  })
})
app.post('/api/validation/single', (req, res) => {
  validMail.single(req.body, resp => {
    const error = resp.error ? resp.error.details : null
    res.status(resp.status).json({valid: resp.valid, error: error})
  })
})
