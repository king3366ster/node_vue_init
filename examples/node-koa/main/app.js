import config from './config'

const path = require('path')
import Koa from 'koa'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import serve from 'koa-static'
import send from 'koa-send'
import Router from 'koa-router'

const app = new Koa()

// static path
app.use(mount('/static', serve(path.join(__dirname, '../webapp/dist'))))

// backend app
import backend from '../backend/app'
app.use(mount('/', backend))

// templates
let router = new Router()
router.get('/', async (ctx, next) => {
  if (ctx.method === 'GET') {
    await send(ctx, 'index.html', {
      root: path.join(__dirname, '../webapp/templates')
    })
  } else {
    ctx.body = {
      code: 404
    }
  }
})
app.use(router.routes())

// app.use(async (ctx, next) => {
//   ctx.body = 'Hello World';
// });

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

const server = app.listen(config.port, () => {
  console.info('server on ', server.address().port)
})
