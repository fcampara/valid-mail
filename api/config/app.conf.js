const express = require('express')
const serveStatic = require('serve-static')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const path = require('path')

const port = process.env.PORT || 5000
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)
io.origins(['http://valid-mail.herokuapp.com', 'http://localhost:8080'])

const allowCors = (req, res, next) => {
  const allowedOrigins = ['http://localhost:8080', 'http://valid-mail.herokuapp.com', 'https://valid-mail.herokuapp.com']
  const origin = req.headers.origin
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }

  res.header('Access-Control-Allow-Methods', 'GET')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
}

app.get('/test', (req, res) => {
  res.status(200).json('Teste');
});

io.on('connection', (socket) => {
  console.log('Connection', socket);
  socket.emit('validMail', 'Lista')
})

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

server.listen(port)


module.exports = {
  app,
  io
}