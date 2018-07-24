const
  express = require('express'),
  serveStatic = require('serve-static'),
  bodyParser = require('body-parser'),
  history = require('connect-history-api-fallback'),
  path = require('path')

const
  allowCors = (req, res, next) => {
    const allowedOrigins = ['http://localhost:8080', 'http://valid-mail.herokuapp.com', 'https://valid-mail.herokuapp.com']
    const origin = req.headers.origin
    if (allowedOrigins.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin)
    }

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

app.use(history())
app.use(serveStatic(path.join(__dirname, '../../dist/pwa-mat')))
