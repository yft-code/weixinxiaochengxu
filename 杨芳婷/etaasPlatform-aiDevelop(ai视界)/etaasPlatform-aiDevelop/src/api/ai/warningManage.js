import request from '@/utils/ai/request'
// 获取分页预警管理列表
export function getWarning(params) {
    return request({
        url: 'ai/warning/page-list',
        method: 'get',
        params
    })
}

//  获取预警等级名称字典
export function getWarningListLeve(params) {
    return request({
        url: 'ai/warning/list-level',
        method: 'get',
        params
    })
}
// 新增预警
export function levelSave(data) {
    return request({
        url: 'ai/warning/level-save',
        method: 'post',
        data
    })
}

// 更新用户
export function levelUpdate(data) {
    return request({
        url: 'ai/warning/level-update',
        method: 'post',
        data
    })
}
//删除预警
export function levelDelete(data) {
    return request({
        url: 'ai/warning/level-delete',
        method: 'post',
        params:data
    })
}

//预警详细信息
export function levelInfo(params) {
    return request({
        url: 'ai/warning/level-info',
        method: 'get',
        params
    })
}

// 获取预警列表
export function getLevelPageList(params) {
    return request({
        url: 'ai/warning/level-page-list',
        method: 'get',
        params
    })
}
// 删除
export function deleteWarning(params) {
    return request({
        url: 'ai/warning/delete-id',
        method: 'delete',
        params
    })
}
// 编辑
export function warningUpdate(data) {
    return request({
        url: 'ai/warning/update',
        method: 'post',
        data
    })
}
//添加
export function addWarning(data) {
    return request({
        url: 'ai/warning/add',
        method: 'post',
        data
    })
}

// 预警的信息详情查询
export function AlgorithmDetail(params) {
    return request({
        url: 'ai/warning/query-details',
        method: 'get',
        params
    })
}

// 
export function isEditable(params) {
    return request({
        url: 'ai/warning/is-editable',
        method: 'get',
        params
    })
}
// 模糊查询
// export function warningList(params) {
//     return request({
//         url: 'warning/query-details',
//         method: 'get',
//         params
//     })
// }

export function warningList(params) {
    return request({
        url: 'ai/warning/list',
        method: 'get',
        params
    })
}

// 上传预案文件
export function warningUpload(data) {
    return request({
        url: 'ai/warning/upload',
        method: 'post',
        data
    })
}

//获取通知模板
export function getTemplate(params) {
    return request({
        url: 'ai/email-template/listActiveTemplate',
        method: 'get',
        params
    })
}