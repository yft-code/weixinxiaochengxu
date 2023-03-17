import request from "@/utils/ai/request";
// 获取预警事件列表
export function alarmlistBacklog(query) {
    return request({
        url: 'ai/alarm/event/list-backlog',
        method: 'get',
        params:query
    })
  }
// 处理预警事件
  export function alarmlisthandleEvent(data) {
    return request({
      url: "ai/alarm/event/handle-event",
      method: "post",
      data
    });
  }
// 场景管理列表
export function sceneList(params) {
    return request({
        url: "ai/scene/list",
        method: "get",
        params
    });
}
// 文件上传
export function uploadFile(data) {
    return request({
        url: "ai/alarm/event/upload",
        method: "post",
        data
    });
}
export function deleteFile(params) {
    return request({
        url: "ai/alarm/delete-upload",
        method: "delete",
        params
    });
}
// 通过id查找事件详情
export function getDetail(params) {
    return request({
        url: "ai/alarm/event/query-backlog-details",
        method: "get",
        params
    });
}

export function getNoticemNum(query) {
    return request({
        url: 'ai/alarm/event/count',
        method: 'get',
    })
  }
  export function handleAll(data) {
    return request({
        url: 'ai/alarm/event/handle-event-all',
        method: 'post',
        data
    })
  }
//  判断是否已读
export function handleRead(params) {
    return request({
        url: 'ai/alarm/event/read',
        method: 'post',
        params
    })
  }
// 判断是否重复
  export function handleRepeat(params) {
    return request({
        url: 'ai/alarm/event/repeat',
        method: 'post',
        params
    })
  }
  //获取事件页数据统计接口
  export function getEventStatis(query) {
    return request({
        url: 'ai/form/getEventStatistical',
        method: 'get',
    })
  }