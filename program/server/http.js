var httpUtils = {
  ok (ctx, res) {
    return httpUtils.send(ctx, 200, res)
  },
  send (ctx, code, res) {
    ctx.response.status = 200
    ctx.body = {
      code: 200,
      msg: '查询成功'
    }
  }
}

module.exports = httpUtils
