import request from '@/utils/ai/request'

export function getAlgorithEvaluation(data) {
    return request({
        url: 'ai/form/count-accuracy',
        method: 'post',
        data
    })
}


export function getDeviceBuildnameList(query) {
    return request({
        url: 'ai/device/buildname-list',
        method: 'get',
        params:query
    })
}

export function getDeviceNameList(query) {
    return request({
        url: 'ai/device/name-list',
        method: 'get',
        params:query
    })
}