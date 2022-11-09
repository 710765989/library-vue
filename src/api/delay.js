import { get, post } from '@/utils/myRequest'

export function list() {
  return get('/delay/list')
}

export function delay(id) {
  return post('/delay/' + id)
}

export function returnBook(id) {
  return post('/borrow/return/' + id)
}
