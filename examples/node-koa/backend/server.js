import Koa from 'koa'
const path = require('path')
const fse = require('fs-extra')

// node7+ only
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import mount from 'koa-mount'
import serve from 'koa-static'
import send from 'koa-send'

const app = new Koa()

// static
app.use(mount('/dist', serve(path.join(__dirname, '../webapp/dist'))))

// session
app.keys = ['koa test']
app.use(session(app, {
  // 默认会话结束后 cookie 失效
  // maxAge: 24 * 60 * 60 * 1000
}))

// body parser
app.use(bodyParser())

// for all get requests, return index.html
app.use(async (ctx, next) => {
  if (ctx.method === 'GET') {
    let data = await fse.readFile(path.join(__dirname, '../webapp/templates/test_vue.html'), 'utf-8')
    ctx.body = data
  } else {
    ctx.body = {
      code: 404
    }
  }
})

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

const server = app.listen(8081, () => {
  console.log('server on ', server.address().port)
})
