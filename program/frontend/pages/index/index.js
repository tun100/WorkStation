import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import 'antd/dist/antd.less'
import '../../less/theme.less'
import './index.less'
import mobx_store from '../../config/mobx_store.js'
import mobx_page from './mobx_page'
const { Provider } = mobxReact

// initialize window variables
window._ = _
window.moment = moment
window.STORE = mobx_store
window.STORE_PAGE = mobx_page
window.utils = utils
window.enterdevmode = () => {
  localStorage.setItem('DEV_MODE', 'yes')
}

// initialize application info
utils.store = mobx_store
utils.storepage = mobx_page
utils.info.title = `Web实时监控管理系统(v1.0)`
utils.info.user = 'admin'
utils.info.password = '123456'
document.title = utils.info.title

// execute task in dev mode
if (utils.isdev()) {
  utils.defer(() => {
    mobx_store.action_login({
      username: utils.info.user,
      password: utils.info.password
    })
  }, 1000)
}

// mount react dom
ReactDOM.render(
  <Provider store={mobx_store} page={mobx_page}>
    <rrdm.HashRouter>
      <App />
    </rrdm.HashRouter>
  </Provider>,
	document.querySelector('#root')
)
