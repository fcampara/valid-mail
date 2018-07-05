const express = require('express'),
  app = module.exports = express(),
  bodyParser = require('body-parser'),
  history = require('connect-history-api-fallback'),
  allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Credentials', 'true')

    next()
  }

app.listen(5000)
app.use(allowCors)
app.use(bodyParser.json({
  limit: '50mb'
}))
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))
app.use(history())
app.use(serveStatic(path.join(__dirname, '/dist/spa-mat')))
