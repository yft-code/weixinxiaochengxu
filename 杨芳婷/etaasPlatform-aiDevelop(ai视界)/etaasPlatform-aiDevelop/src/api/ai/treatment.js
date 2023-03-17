import request from '@/utils/ai/request'
//4h重复发生率
export function eventRepeat(data){
    return request({
        url: 'ai/form/event-repeat',
        method:'post',
        data
    })
}
// 处理时长
export function handleTime(data) {
    return request({
        url: 'ai/form/handle-time',
        method:'post',
        data
    })
}
//员工列表
export function getUserList(params) {
    return request({
        url: 'ai/sys/depart/list-user',
        method:'get',
        params
    })
}
//建筑列表
export function getBuilding(params) {
    return request({
        url: 'ai/device/buildname-list',
        method:'get',
        params
    })
}
// 设备列表
export function getDevice(params) {
    return request({
        url: 'ai/device/name-list',
        method:'get',
        params
    })
}