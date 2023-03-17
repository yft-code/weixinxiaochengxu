import request from '@/utils/ai/request'
//隐患库信息查询
export function gethiddenList(query) {
    return request({
        url: '/ai/hidden/page-list',
        method: 'get',
        params:query
    })
}
//删除隐患库信息
export function deletehiddenList(params) {
    return request({
        url: 'ai/hidden/delete',
        method: 'delete',
        params
    })
}
//编辑隐患库信息
export function updatehiddenList(data) {
    return request({
        url: 'ai/hidden/update',
        method: 'post',
        data
    })
}
//新增隐患库信息
export function addhiddenList(data) {
    return request({
        url: 'ai/hidden/add',
        method: 'post',
        data
    })
}

// 隐患库识别
export function selecthiddenList(data) {
    return request({
        url: '/ai/hidden-trouble-info/img-contrast',
        // url: "/ai/hidden-trouble-info/img-contrast?id=74&conf=88",
        method: 'post',
        data
    })
}