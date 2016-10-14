import Koa from 'koa'
const app = new Koa()

import router from './router'
app.use(router.routes())

export default app
