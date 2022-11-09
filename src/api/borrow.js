import { get, post } from '@/utils/myRequest'

export function save(params) {
  return post('/borrow/save', params)
}

export function list() {
  return get('/borrow/list')
}

export function returnBook(id) {
  return post('/borrow/return/' + id)
}

