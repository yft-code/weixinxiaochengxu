import request from '@/utils/ai/request'
//人脸抓拍分页查询
export function getRecordConfig(query) {
    return request({
        url: '/ai/video/record-config',
        method: 'get',
        params:query
    })
}
// 删除邮件模板
export function updateRecordConfig(data) {
    return request({
        url: '/ai/video/update-record-config',
        method: 'post',
        data
    })
}