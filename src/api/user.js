import http from '@/utils/http'

const userUrl = '/user'

export default {
  userPageQuery: params => {
    return http
      .post(userUrl + '/v1/upmsUser/pageQuery', params)
      .then(res => res.data)
  },
  getUserById: params => {
    return http
      .get(`${userUrl}/v1/upmsUser/get/${params}`)
      .then(res => res.data)
  },
  updateUser: params => {
    return http
      .put(`${userUrl}/v1/upmsUser/update`, params)
      .then(res => res.data)
  },
  saveUser: params => {
    return http
      .post(`${userUrl}/v1/upmsUser/save`, params)
      .then(res => res.data)
  },
  deleteUser: params => {
    return http
      .delete(`${userUrl}/v1/upmsUser/delete/${params}`)
      .then(res => res.data)
  },
  changeStatus: params => {
    return http
      .put(`${userUrl}/v1/upmsUser/changeStatus/${params.id}/${params.status}`)
      .then(res => res.data)
  },
  lockStatus: params => {
    return http
      .put(`${userUrl}/v1/upmsUser/lockStatus/${params.id}/${params.status}`)
      .then(res => res.data)
  }
}
