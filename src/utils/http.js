import axios from 'axios'
import { constVar } from '@/config/config'
axios.defaults.baseURL = 'http://localhost:8200/api'
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// http request 拦截器

axios.defaults.timeout = 10000
axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

axios.interceptors.request.use(
  config => {
    // if (config.method != "get") {
    //   config.data = qs.stringify(config.data);
    // }
    let tokenInfo = JSON.parse(localStorage.getItem(constVar.tokenInfoKey))
    console.log(tokenInfo)
    if (tokenInfo) {
      config.headers.Authorization =
        tokenInfo.token_type + ' ' + tokenInfo.access_token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  err => {
    let errMsg = ''
    if (err && err.response.status) {
      switch (err.response.status) {
        case 401:
          errMsg = '登陆状态失效,请重新登录'
          break
        case 403:
          errMsg = '无访问权限'
          break
        case 408:
          errMsg = '请求超时'
          break
        case 500:
          errMsg = '服务器内部异常'
          break
        case 501:
          errMsg = '服务未实现'
          break
        case 502:
          errMsg = '网关错误'
          break
        case 503:
          errMsg = '服务不可用'
          break
      }
    } else {
      errMsg = err
    }
    this.$message.error(errMsg)
    return Promise.reject(errMsg)
  }
)

export default axios
