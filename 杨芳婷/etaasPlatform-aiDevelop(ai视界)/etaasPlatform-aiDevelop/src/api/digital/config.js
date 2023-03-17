export const model_url = window.api.model_url;
import request from '@/utils/ai/request'

export function bingDevice(data) {
    return request({
        url: 'ai/device/bind-device',
        method: 'post',
        data
    })
}
export function getDevices(query) {
    return request({
        url: 'ai/device/device-list',
        method: 'get',
        params: query
    })
}

export function getVideoStream(data) {
    return request({
        url: 'ai/video/stream',
        method: 'post',
        data
    })
}

// 设备分页列表查询
export function getDevicePageList(query) {
    return request({
        url: 'ai/device/page-list',
        method: 'get',
        params: query
    })
}

// 绑定组件点位
export function bindPoint(data) {
    return request({
        url: 'ai/index/bind-point',
        method: 'post',
        data
    })
}
export function bindArea(data) {
    return request({
        url: 'ai/area/bind-area',
        method: 'get',
        data
    })
}
export function pointArea(data) {
    return request({
        url: 'ai/area/point-area',
        method: 'get',
        data
    })
}
export function getPoint(query) {
    return request({
        url: 'ai/area/point-list',
        method: 'get',
        params: query
    })
}