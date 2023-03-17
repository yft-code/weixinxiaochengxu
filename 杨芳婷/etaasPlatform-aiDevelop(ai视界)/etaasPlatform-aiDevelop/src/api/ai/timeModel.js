import request from '@/utils/ai/request'
// 分页查询时间模版
export function getTimeModel(params) {
    return request({
        url: 'ai/time-template/page-list',
        method: 'get',
        params
    })
}

// 删除时间模板
export function deleteTimeModel(params) {
    return request({
        url: 'ai/email-template/delete',
        method: 'post',
        params
    })
}

// 新增时间模版
export function addTimeModel(data) {
    return request({
        url: 'ai/time-template/insert',
        method: 'post',
        data
    })
}

// 获取内置事件变量和地点变量
export function getTimeVerity(params) {
    return request({
        url: 'ai/email-template/listVar',
        method: 'get',
        params
    })
}

// 更新时间模版
export function updateTimeModel(data) {
    return request({
        url: 'ai/time-template/update',
        method: 'post',
        data
    })
}

// 启用模板
export function updateActiveTime(params) {
    return request({
        url: 'ai/time-template/updateActive',
        method: 'post',
        params
    })
}

// 查看时间模板详细信息
export function checkTime(params) {
    return request({
        url: 'ai/time-template/detail',
        method: 'get',
        params
    })
}

// 检查模版名称是否冲突
export function isNameConflict(params) {
    return request({
        url: 'ai/time-template/isNameConflict',
        method: 'get',
        params
    })
}

// 检查时间模版是否已经和场景关联，关联则返回所有的场景名称
export function checkBind(params) {
    return request({
        url: 'ai/time-template/checkBind',
        method: 'get',
        params
    })
}
