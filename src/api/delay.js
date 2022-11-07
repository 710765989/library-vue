import { get, post } from '@/utils/myRequest'

export function list() {
  return get('/delay/list')
}

export function save(params) {
  return post('/borrow/save', params)
}

export function returnBook(id) {
  return post('/borrow/return/' + id)
}
