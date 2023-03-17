import request from "@/utils/ai/request";
// 获取设备当前周内产生的事件 
export function getEvent(params) {
  return request({
    url: "ai/form/getCurrentWeekEvents",
    method: "get",
    params
  });
}

// 获取事件回溯视频 
export function getDevice(params) {
  return request({
    url: "ai/form/getRecordByDevice",
    method: "get",
    params
  });
}



// 获取事件统计清空
export function deviceEventStatistical(params) {
  return request({
    url: "ai/alarm/event/device-event-statistical",
    method: "get",
    params
  });
}

// 获取概览页面数据
export function getData(params) {
  return request({
    url: "ai/form/getOverViewData",
    method: "get",
    params
  });
}



export function getListBacklog(params) {
  return request({
    url: "ai/alarm/event/list-backlog",
    method: "get",
    params
  });
}

export function getRecordByDevice(params) {
  return request({
    url: "ai/form/getRecordByDevice",
    method: "get",
    params
  });
}


