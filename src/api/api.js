import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.10.191:8200/api'
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    if (window.localStorage.getItem('token')) {
      // 在发送请求之前做些什么
      config.headers.Authorization =
        'Bearer ' + window.localStorage.getItem('token')
    }
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

// 定义请求
export const getCates = params => {
  return axios.get('/getCates', params).then(res => res.data)
}
