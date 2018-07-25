const app = require('../api/config/app.conf.js')
const listController = require('../api/controller/listController.js')

app.post('/api/validation/list', (req, res) => {
  listController.validList(req.body, resp => {
    res.status(resp.status).json({msg: resp.msg, error: resp.error.details})
  })
})
