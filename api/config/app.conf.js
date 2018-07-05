const
  express = require('express'),
  serveStatic = require('serve-static'),
  bodyParser = require('body-parser'),
  history = require('connect-history-api-fallback'),
  path = require('path')

const
  allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080, https://valid-mail.herokuapp.com, http://valid-mail.herokuapp.com/')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', 'true')
    next()
  },
  port = process.env.PORT || 5000,
  app = module.exports = express()

app.listen(port)
app.use(allowCors)
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

console.log(__dirname)
console.log(path.join(__dirname, '../../dist/pwa-mat'))
app.use(history())
app.use(serveStatic(path.join(__dirname, '../../dist/pwa-mat')))
