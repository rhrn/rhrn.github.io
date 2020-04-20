const { server } = require('./server')

server.listen(8080, '0.0.0.0', () => {
  console.log('listen started')
})
