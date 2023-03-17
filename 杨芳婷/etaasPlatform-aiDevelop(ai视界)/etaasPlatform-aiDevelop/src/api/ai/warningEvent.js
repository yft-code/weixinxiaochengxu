import request from '@/utils/ai/request'
//获取echart信息
export function getChartInfo(params){
    return request({
        url: 'ai/form/chart1',
        method:'get',
        params
    })
}
// 获取echart信息
export function getChartInfoSecond(params) {
    return request({
        url: 'ai/form/chart2',
        method:'get',
        params
    })
}
// 获取echart信息
export function getChartInfoThird(params) {
    return request({
        url: 'ai/form/chart3',
        method:'get',
        params
    })
}
//获取部门列表
export function getDepartInfo(params) {
    return request({
        url: 'ai/sys/depart/list-depart',
        method:'get',
        params
    })
}
//获取员工列表
export function getUserInfo(params) {
    return request({
        url: 'ai/sys/depart/list-user',
        method:'get',
        params
    })
}
//获取设备名称
export function getDeviceInfo(params) {
    return request({
        url: 'ai/device/name-list',
        method:'get',
        params
    })
}
//获取通知对象
export function getUserList(params) {
    return request({
        url: 'ai/scene/list-users',
        method:'get',
        params
    })
}