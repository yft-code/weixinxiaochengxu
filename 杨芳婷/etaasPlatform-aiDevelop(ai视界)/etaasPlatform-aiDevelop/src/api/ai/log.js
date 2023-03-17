import request from "@/utils/ai/request";

//获取日志
export function getLog(query) {
  return request({
      url: '/ai/log/device-alg',
      method: 'get',
      params:query
  })
}

