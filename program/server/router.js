var _ = require('lodash')
var moment = require('moment')
var Router = require('koa-router')
var dbutils = require('./db.js')
var httpUtils = require('./http.js')

const router = new Router({
  prefix: '/api'
})

router.get('/system/status', async ctx => {
  var userCtn = await dbutils.count(`select * from wst_user`)
  httpUtils.ok(ctx, {
    needRegister: userCtn === 0
  })
})

module.exports = router
