const { flow, transaction } = mobx

function commonResHandler(res){
  return res.data;
}

const crtUtils = {
  get (...args) {
    return commonResHandler(axios.get(...args)) 
  },
  post (...args) {
    return commonResHandler(axios.post(...args)) 
  },
  defer (func, timeval) {
    return setTimeout(func, timeval)
  },
  isdev () {
    return !_.isNil(localStorage.getItem('DEV_MODE'))
  },
  flow (func) {
    return flow(func)
  },
  now () {
    return new Date().getTime()
  },
  log (...args) {
    console.log(...args)
  },
  contains (val, str) {
    return _.indexOf(val, str) !== -1
  },
  sleep (timeval) {
    return new Promise(r => {
      setTimeout(() => {
        r()
      }, timeval)
    })
  },
  info: {
    title: ''
  }
}

module.exports = crtUtils
