var _ = require('lodash')
var webpack = require('webpack')
var path = require('path')

module.exports = (conf, mode) => {
  conf.plugins = [
    new webpack.ProvidePlugin({
      _: 'lodash',
      moment: 'moment',
      react: 'react',
      React: 'react',
      crc: 'create-react-class',
      mobx: 'mobx',
      rr: 'react-router',
      antd: 'antd',
      rrdm: 'react-router-dom',
      utils: path.join(__dirname, 'object_utils.js'),
      cpt: path.join(__dirname, 'object_cpt.js'),
      gcpt: path.join(__dirname, 'decorator_gcpt.js'),
      mobxReact: 'mobx-react'
    }),
    ...conf.plugins
  ]
  return _.merge(conf, {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          pathRewrite: { '^/api': '' }
        }
      }
    }
  })
}
