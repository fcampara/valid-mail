// Basic infos to server
const express = require('express')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const path = require('path')

const port = process.env.PORT || 5000
const app = express()

// Socket-io
const validMailSocket = require('../socket.io/validMail')
const server = require('http').Server(app)
app.io = require('socket.io')(server)
app.io.origins(['http://valid-mail.herokuapp.com', 'http://localhost:8080'])
validMailSocket.start(app.io)

const allowCors = (req, res, next) => {
  const allowedOrigins = ['http://localhost:8080', 'http://valid-mail.herokuapp.com']
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

app.use(allowCors)
app.use(bodyParser.json({
  limit: 1000000,
  type: 'application/json'
}))
app.use(bodyParser.urlencoded({
  limit: 1000000,
  extended: true
}))

app.use(history())
app.use(serveStatic(path.join(__dirname, '../../dist/pwa-mat')))

server.listen(port)

module.exports = {
  app
}
