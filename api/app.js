const app = require('../api/config/app.conf.js')
const validController = require('../api/controller/validController.js')

app.post('/valid', (req, res) => {
  const data = {
    list: req.body.list,
    user: req.body.user,
    name: req.body.name
  }

  validController.valid(data, resp => {
    res.json(resp)
  })
})
