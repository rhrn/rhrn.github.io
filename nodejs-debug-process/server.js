const http = require('http')
const { app } = require('./app')

const server = http.createServer((req, res) => {
  app(req, res)
})

exports.server = server
