const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
// const json = require('koa-json')
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
// const koaBody = require('koa-body') //解析文件上传
const cors = require('./utils/cors')

const router = require('./routes/index')
const music = require('./routes/music')
const user = require('./routes/user')
const notes = require('./routes/notes')

const log = require('./log/index')

// error handler
onerror(app)

// middlewares
app.use(convert(bodyparser()))
// app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(__dirname + '/files'))


app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

//跨域设置cors
app.use(cors)

//挂载文件解析中间件
// app.use(koaBody({
//   multipart: true, //支持表单上传
//   formidable: {
//     maxFileSize: 20 * 1024 * 1024 //限制文件大小，默认2M
//   }
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(router.routes(), router.allowedMethods())
app.use(music.routes(), music.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(notes.routes(), notes.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.log('奇怪的错误' + JSON.stringify(ctx.onerror))
  console.error('server error', err, ctx)
});

module.exports = app