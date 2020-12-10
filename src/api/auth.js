import http from '@/utils/http'

const authUrl = '/auth'

export default {
  captcha: () => {
    return http.get(authUrl + '/captcha').then(res => res.data)
  },
  login: params => {
    return http.post(authUrl + '/oauth/token', params).then(res => res.data)
  }
}
