// 区域绑定
import request from '@/utils/ai/request'
// 绑定组件点位
export function bindPoint(data) {
    return request({
        url: 'ai/index/bind-point',
        method: 'post',
        data
    })
}

// 点位绑定设备
export function bindDevice(params) {
    return request({
        url: 'ai/device/bind-device',
        method: 'post',
        params
    })
}

//  设备分页列表查询
export function pageList(query) {
    return request({
        url: 'ai/device/page-list',
        method: 'get',
        params:query
    })
}

//  获取设备详细信息查询
export function querDetails(query) {
    return request({
        url: 'ai/warning/query-details',
        method: 'get',
        params:query
    })
}

// 添加设备
export function deviceSave(data) {
    return request({
        url: 'ai/device/save',
        method: 'post',
        data
    })
}

//  监管场景分页列表
export function scenePageList(query) {
    return request({
        url: 'ai/scene/page-list',
        method: 'get',
        params:query
    })
}

//  详情页更新场景信息
export function sceneUpdateDetails(data) {
    return request({
        url: 'ai/scene/update-details',
        method: 'put',
        data
    })
}

// 新增场景信息
export function sceneSave(data) {
    return request({
        url: 'ai/scene/save',
        method: 'post',
        data
    })
}

export function getWarningList(params) {
    return request({
        url: 'ai/warning/list',
        method: 'get',
        params
    })
}
// 备注

export function comment(data) {
    return request({
        url: 'ai/device/comment',
        method: 'post',
        data
    })
}

// 获取区域查询
export function getAreaPageList(query) {
    return request({
        url: 'ai/area/page-list',
        method: 'get',
        params:query
    })
}