const express = require('express')
const path = require('path')
const next = require('next')
const Router = require('./routes').Router

const dev = process.env.NODE_ENV !== 'production'
const port = parseInt(process.env.PORT, 10) || 3000
const app = next({ dir: '.', dev })
const handle = app.getRequestHandler()

const cssModulesHook = require('css-modules-require-hook')

cssModulesHook({
  generateScopedName: '[local]__[hash:base64:3]'
})

app.prepare()
  .then(_ => {
    const server = express()

    Router.forEachPattern((page, pattern, defaultParams) => server.get(pattern, (req, res) =>
    app.render(req, res, `/${page}`, Object.assign({}, defaultParams, req.query, req.params))
  ))
    server.get('*', (req, res) => handle(req, res))

    server.listen(port, err => {
      if (err) console.error(err)

      console.log('> App running on port ' + port)
    })
  })
