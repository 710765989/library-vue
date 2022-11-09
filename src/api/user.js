import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}


export function getUserOne (userId) {
  return request({
    url: `/user/${userId || ''}`,
    method: 'get'
  })
}

export function addUser (data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export function updateUser (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export function delUser (userId) {
  return request({
    url: `/user/${userId || ''}`,
    method: 'delete'
  })
}
