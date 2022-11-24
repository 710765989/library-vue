import { post } from '@/utils/myRequest'

export function updatePassword(params) {
  return post('/user/update/password', params)
}
