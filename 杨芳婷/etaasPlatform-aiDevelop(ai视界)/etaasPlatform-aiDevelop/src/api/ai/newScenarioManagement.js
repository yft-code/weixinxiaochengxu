import request from "@/utils/ai/request";

//设备算法分页查询
export function getDeviceAlgList(params) {
    return request({
        url: 'ai/device/device-alg-list',
        method: 'get',
        params
    })
}

// 新增or编辑设备算法
export function deviceControlAlg(data) {
    return request({
        url: 'ai/device/device-alg',
        method: 'post',
        data
    })
}

//移除设备算法
export function removeDeviceAlg(query) {
    return request({
        url: 'ai/device/remove-device-alg',
        method: 'Delete',
        params:query
    })
}

export function getAlgorithm(params) {
    return request({
        url: 'ai/algorithm/page-list',
        method: 'get',
        params
    })
}

//根据设备查询设备算法信息
export function getDeviceAlgByDeviceId(params) {
    return request({
        url: 'ai/device/device-alg',
        method: 'get',
        params
    })
}

// 设备算法批量处理
export function batchDeviceAlg(data) {
    return request({
        url: 'ai/device/batch-device-alg',
        method: 'post',
        data
    })
}

//抓帧
export function getDeviceVideoPic(params) {
    return request({
        url: 'ai/device/device-pic',
        method: 'get',
        params
    })
}

//预警名称列表
export function warningList(params) {
    return request({
        url: 'ai/warning/list',
        method: 'get',
        params
    })
}
//时间模板
export function getListActiveTemplate(params) {
    return request({
        url: 'ai/time-template/listActiveTemplate',
        method: 'get',
        params
    })
}

export function userPageList(query) {
    return request({
        //url: 'ai/sys/user/page-list',
        url: 'uc/user/queryByParameters',
        method: 'post',
        params:query
    })
}


// 算法布控和取消

export function controlAlg(params) {
    return request({
        url: 'ai/device/control-alg',
        method: 'get',
        params
    })
}
//非法入侵-智能联动获取信息
export function getBeltList(params) {
    return request({
        url: 'ai/device/list-belt-device',
        method: 'get',
        params
    })
}