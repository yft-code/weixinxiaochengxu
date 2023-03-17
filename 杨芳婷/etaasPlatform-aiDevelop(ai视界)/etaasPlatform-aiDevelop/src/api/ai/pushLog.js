import request from '@/utils/ai/request'
// 获取日志
export function getLogList(params) {
    return request({
        url: 'ai/mail/page-list',
        method: 'get',
        params
    })
}

// 事件编号查详细
export function getAlarmDataById(params) {
    return request({
        url: `ai/alarm/event/${params}`,
        method: 'get',
        // params
    })
}

// 预警名称
export function warningList(params) {
    return request({
        url: 'ai/warning/list',
        method: 'get',
        params
    })
}

//查看视频
export function getRecordByDevice(params) {
    return request({
      url: "ai/form/getRecordByDevice",
      method: "get",
      params
    });
  }
  