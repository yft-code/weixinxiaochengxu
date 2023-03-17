import request from '@/utils/ai/request'
// 获取算法列表
export function getAlgorithm(params) {
    return request({
        url: 'ai/algorithm/page-list',
        method: 'get',
        params
    })
}
// 删除算法
export function deleteAlgorithm(params) {
    return request({
        url: 'ai/algorithm/delete',
        method: 'delete',
        params
    })
}
// 编辑算法
export function algorithmUpdate(data) {
    return request({
        url: 'ai/algorithm/update',
        method: 'post',
        data
    })
}
// 算法的信息详情查询
export function AlgorithmDetail(params) {
    return request({
        url: 'ai/algorithm/query-details',
        method: 'get',
        params
    })
}

// 算法的高级配置
export function AlgorithmConfigs(data) {
    return request({
        url: '/ai/algorithm/advanced-config',
        method: 'post',
        data
    })
}

// 查找算法的高级配置信息
export function getConfigs() {
    return request({
        url: '/ai/algorithm/query-advanced-config',
        method: 'get'
    })
}

// 查找人脸库信息
export function getfaceInfo() {
    return request({
        url: '/ai/face/face-db/all',
        method: 'get'
    })
}