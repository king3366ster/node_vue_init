let router = require('koa-router')({
  prefix: '/api'
})

router
  .get('/test', async (ctx, next) => {
    ctx.body = 'inner html'
  })

export default router
