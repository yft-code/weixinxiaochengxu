import request from '@/utils/ai/request'
// 删除算法
export function deleteAlgorithm(params) {
    return request({
        url: 'ai/algorithm/delete',
        method: 'get',
        params
    })
}
