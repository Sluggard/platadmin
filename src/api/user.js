import http from '@/utils/http'

const userUrl = '/user'

export default {
  userPageQuery: params => {
    return http
      .post(userUrl + '/v1/upmsUser/pageQuery', params)
      .then(res => res.data)
  }
}
