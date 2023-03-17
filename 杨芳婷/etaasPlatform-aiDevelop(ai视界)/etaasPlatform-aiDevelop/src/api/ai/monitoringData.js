import request from '@/utils/ai/request'
// 获取监控数据列表
export function getMonitoring(params) {
    return request({
        url: 'ai/video/page-list',
        method: 'get',
        params
    })
}
