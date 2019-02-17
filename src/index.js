import http from 'http'

let app = require('./server').default

let currentHandler = app.callback()
const server = http.createServer(currentHandler)

const { PORT = 3000 } = process.env

server.listen(PORT, error => {
  if (error) {
    console.log(error)
  }

  console.log(`🚀 started @ http://localhost:${PORT}`)
})

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!')

  module.hot.accept('./server', () => {
    console.log('🔁  HMR Reloading `./server`...')

    try {
      const newHandler = require('./server').default.callback()
      server.removeListener('request', currentHandler)
      server.on('request', newHandler)
      currentHandler = newHandler
    } catch (error) {
      console.error(error)
    }
  })
}
