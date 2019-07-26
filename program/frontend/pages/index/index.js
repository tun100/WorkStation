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
window.axios = axios
window.enterdevmode = () => {
  localStorage.setItem('DEV_MODE', 'yes')
}

// initialize application info
utils.store = mobx_store
utils.storepage = mobx_page
utils.info.title = `WorkStation-工作站`
document.title = utils.info.title

// invoke init func immediately
async function initFunc () {
  // var status = await utils.get('/api/system/status')
  // _.merge(mobx_store.login_info, status)
}
initFunc()

// mount react dom
ReactDOM.render(
  <Provider store={mobx_store} page={mobx_page}>
    <rrdm.HashRouter>
      <App />
    </rrdm.HashRouter>
  </Provider>,
	document.querySelector('#root')
)
