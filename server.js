const http = require("http")
const url = require("url")
const next = require("next")

const app = next({ dev: process.env.NODE_ENV === 'production' || false })
const handle = app.getRequestHandler()
const port = parseInt(process.argv[2]) || 3000
app.prepare().then(() => {
  http
    .createServer((req, res) => {
      const parsedUrl = url.parse(req.url, true)
      const { pathname, query } = parsedUrl
      handle(req, res, parsedUrl)
    })
    .listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
})
