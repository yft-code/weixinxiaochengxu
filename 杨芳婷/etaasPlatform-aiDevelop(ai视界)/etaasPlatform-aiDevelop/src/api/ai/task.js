import request from '@/utils/ai/request'
// 添加
export function add(data) {
    return request({
        url: 'ai/gather/add',
        method: 'post',
        data
    })
}

// 获取任务列表
export function getList(params) {
    return request({
        url: 'ai/gather/page-list',
        method: 'get',
        params
    })
}
// 删除
export function taskDelete(params){
    return request({
        url: 'ai/gather/delete',
        method: 'delete',
        params
    })
}

// 获取设备列表
export function deviceList(params){
    return request({
        url: 'ai/device/device-list',
        method: 'get',
        params
    })
}

// 终止任务
export function stop(params){
    return request({
        url: 'ai/gather/stop',
        method: 'post',
        params
    })
}

// 列表任务 /gather/page-list-file
export function getFileList(params){
    return request({
        url: 'ai/gather/page-list-file',
        method: 'get',
        params
    })
}

// 删除file

export function deleteFile(params){
    return request({
        url: 'ai/gather/delete-file',
        method: 'delete',
        params
    })
}