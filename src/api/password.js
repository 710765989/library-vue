import { post } from '@/utils/myRequest'

export function updatePwd(params) {
  return post('/user/updatePwd', params)
}
