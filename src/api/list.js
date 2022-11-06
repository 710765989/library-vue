import { get, post } from '@/utils/myRequest'

export function getList(params) {
  return get('/management/list', params)
}

export function save(params) {
  return post('/management/save', params)
}

export function enable(params) {
  return post('/management/enable', params)
}
