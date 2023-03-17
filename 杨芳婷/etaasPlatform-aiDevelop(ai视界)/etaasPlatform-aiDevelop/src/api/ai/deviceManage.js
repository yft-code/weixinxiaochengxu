import request from '@/utils/ai/request'
import requestLoad from '@/utils/ai/requestLoad'
// 获取所有设备序列号接接口
export function serialnumberList(query) {
    return request({
        url: 'ai/device/serialnumber-list',
        method: 'get',
        params:query
    })
}
// 获取所有园区/厂区的名称（旧）
export function parknameList(query) {
    return request({
        url: 'ai/device/parkname-list',
        method: 'get',
        params:query
    })
}
// 获取所有园区/厂区的名称（新）
export function getParknameList(query) {
    return request({
        url: 'ai/building/park-list',
        method: 'get',
        params:query
    })
}

// 获取所有区域
export function getAreanameList(query) {
    return request({
        url: 'ai/area/page-list',
        method: 'get',
        params:query
    })
}
// 获取所有设备的IP地址
export function ipList(query) {
    return request({
        url: 'ai/device/ip-list',
        method: 'get',
        params:query
    })
}
// 获取所有建筑列表(旧)
export function buildnameList(query) {
    return request({
        url: 'ai/device/buildname-list',
        method: 'get',
        params:query
    })
}

// 获取所有建筑列表(新)
export function getBuildnameList(query) {
    return request({
        url: 'ai/building/building-list',
        method: 'get',
        params:query
    })
}
// 获取所有楼层列表（旧）
export function floorList(query) {
    return request({
        url: 'ai/device/floor-list',
        method: 'get',
        params:query
    })
}

// 获取所有楼层列表（新）
export function getFloorList(query) {
    return request({
        url: 'ai/building/floor-list',
        method: 'get',
        params:query
    })
}

// 获取状态列表
export function stateList(query) {
    return request({
        url: 'ai/device/state-list',
        method: 'get',
        params:query
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

// 添加设备
export function deviceSave(data) {
    return request({
        url: 'ai/device/save',
        method: 'post',
        data
    })
}

// 上传文件保存
export function importFile(data) {
    return request({
        url: 'ai/device/import-xls',
        method: 'post',
        data
    })
}

// 上传视频
export function importVideo(data) {
    return requestLoad({
        url: 'ai/demo/upload',
        method: 'post',
        data
    })
}
//  编辑设备信息
export function deviceUpdate(data) {
    return request({
        url: 'ai/device/update',
        method: 'post',
        data
    })
}

//  设备详细信息查询
export function querDetails(query) {
    return request({
        url: 'ai/warning/query-details',
        method: 'get',
        params:query
    })
}

// 删除设备
export function deviceDelete(params) {
    return request({
        url: 'ai/device/delete-id',
        method: 'delete',
        params
    })
}
// 获取视频流
export function getVediostream(data) {
    return request({
        url: 'ai/video/stream',
        method: 'post',
        data
    })
}
//获取设备默认监控事件
  export function deviceEvent(query) {
    return request({
        url: 'ai/device/index-list',
        method: 'get',
        params:query
    })
  }