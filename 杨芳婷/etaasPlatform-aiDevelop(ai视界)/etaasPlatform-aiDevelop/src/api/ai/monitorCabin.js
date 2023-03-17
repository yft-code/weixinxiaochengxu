import request from '@/utils/ai/request'
export function sumAndDay(params) {
    return request({
      url: "ai/form/sumAndDay",
      method: "get",
      params
    });
  }

export function getWeather(params) {
    return request({
      url: "ai/form/weather",
      method: "get",
      params
    });
}

export function getDevice(params) {
  return request({
    url: "ai/device/screen-device-list",
    method: "get",
    params
  })

  
}
  export function getCurrent(params) {
    return request({
      url: "ai/alarm/event/current",
      method: "get",
      params
    })
  }
  

  // 告警记录分页
  export function getSimpleEventList(params) {
    return request({
      url: "ai/alarm/event/list",
      method: "get",
      params
    })
  }