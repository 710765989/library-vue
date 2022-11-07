import { get, post } from '@/utils/myRequest'

export function save(params) {
  return post('/borrow/save', params)
}

export function list() {
  return get('/borrow/list')
}

// export function status(params) {
//   return get('/dictionary/list', { 'key': 'book.status' })
// }
//
// export function type(params) {
//   return get('/dictionary/list', { 'key': 'book.type' })
// }
