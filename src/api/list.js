import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/management/list',
    method: 'get',
    params
  })
}
