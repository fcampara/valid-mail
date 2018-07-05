const app = require('../api/config/app.conf.js')
const validController = require('../api/controller/validController.js')

app.post('/valid', (req, res) => {
  const list = req.body.list
  validController.valid(list, resp => {
    res.json(resp)
  })
})
