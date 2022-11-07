import { get } from '@/utils/myRequest'

export function list(params) {
  return get('/dictionary/list', { 'key': params })
}

export function bookStatuses() {
  return get('/dictionary/list', { 'key': 'book.status' })
}

export function bookTypes() {
  return get('/dictionary/list', { 'key': 'book.type' })
}

// export function borrowStatus() {
//   return get('/dictionary/list', { 'key': 'borrow.status' })
// }
