import Koa from 'koa'
import serve from 'koa-static'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { App } from './components/App'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

// Initialize `koa-router` and setup a route listening on `GET /*`
// Logic has been splitted into two chained middleware functions
// @see https://github.com/alexmingoia/koa-router#multiple-middleware
const router = new Router()
router.get(
  '/*',
  (ctx, next) => {
    const context = {}
    const markup = renderToString(<App />)
    ctx.state.markup = markup
    return context.url ? ctx.redirect(context.url) : next()
  },
  ctx => {
    ctx.status = 200
    ctx.body = `
    <!doctype html>
      <html lang="">
      <head>
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta charset="utf-8" />
          <title>CSS Modules with SCSS and React SSR</title>
          <link rel="stylesheet" href="https://www.sueddeutsche.de/assets/contracts/fonts/fonts2017.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1">
          ${assets.client.css ? `<link rel="stylesheet" href="${assets.client.css}">` : ''}
          ${
            process.env.NODE_ENV === 'production'
              ? `<script src="${assets.client.js}" defer></script>`
              : `<script src="${assets.client.js}" defer crossorigin></script>`
          }
      </head>
      <body>
          <div id="root">${ctx.state.markup}</div>
      </body>
    </html>`
  },
)

// Intialize and configure Koa application
const server = new Koa()
server
  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  .use(serve(process.env.RAZZLE_PUBLIC_DIR))
  .use(router.routes())
  .use(router.allowedMethods())

export default server
