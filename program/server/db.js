var _ = require('lodash')
var path = require('path')
var sqlite3 = require('sqlite3').verbose()

var meta_db_path = path.normalize(path.join(__dirname, '..', '..', 'db', 'meta.db'))
let db = new sqlite3.Database(meta_db_path)

const dbutils = {
  count: async function (sql, param) {
    var ctnsql = `select count(*) as ctn from (${sql}) ctntb`
    console.log(ctnsql)
    var res = await dbutils.all(ctnsql)
    return _.get(res, '0.ctn')
  },
  handleIfEmpty: async function (sql, param, ifempty, returndata) {
    var res_ctn = await dbutils.count(sql, param)
    if (res_ctn === 0) {
      await ifempty()
    }
    if (returndata) {
      var res_data = await dbutils.all(sql, param)
      return res_data
    }
  },
  all: async function (sql, param) {
    return new Promise((res_func, err_func) => {
      db.all(sql, param, function (error, res) {
        if (error) {
          err_func(error)
        } else {
          res_func(res)
        }
      })
    })
  },
  run: async function (sql, param) {
    return new Promise((res_func, err_func) => {
      db.run(sql, param, function (error, res) {
        if (error) {
          err_func(error)
        } else {
          res_func(res)
        }
      })
    })
  },
  runsafe: async function (sql, param) {
    try {
      return await dbutils.run(sql, param)
    } catch (error) {
			// ignore error, dbrunsafe doesn't print the error
    }
  }
}

module.exports = dbutils
