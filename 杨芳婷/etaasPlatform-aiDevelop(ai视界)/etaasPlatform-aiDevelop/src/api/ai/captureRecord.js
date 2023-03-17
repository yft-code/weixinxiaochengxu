import request from '@/utils/ai/request'
//人脸抓拍分页查询
export function getfaceList(query) {
    return request({
        url: '/ai/face-capture/page-list',
        method: 'get',
        params:query
    })
}
//查询人脸抓拍详细信息
export function getFaceDetailInfo(query) {
    return request({
        url: '/ai/face-capture/info',
        method: 'get',
        params:query
    })
}
//查询人员轨迹
export function getTrace(query) {
    return request({
        url: '/ai/face-capture/person-trace',
        method: 'get',
        params:query
    })
}
//查看录像回放
export function getRecord(query) {
    return request({
        url: '/ai/face-capture/history-record',
        method: 'get',
        params:query
    })
}