import { get } from '@/utils/myRequest'

export function list(params) {
  return get('/dictionary/list', { 'key': params })
}

export function status(params) {
  return get('/dictionary/list', { 'key': 'book.status' })
}

export function type(params) {
  return get('/dictionary/list', { 'key': 'book.type' })
}
