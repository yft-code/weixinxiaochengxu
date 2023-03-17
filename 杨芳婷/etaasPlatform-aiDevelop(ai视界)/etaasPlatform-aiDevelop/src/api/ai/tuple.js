import request from '@/utils/ai/request'
// 获取元组件列表
export function getComponent(params) {
    return request({
        url: 'ai/component/page',
        method: 'get',
        params
    })
}
// 添加元组件
export function addComponent(data) {
    return request({
        url: 'ai/component/save',
        method: 'post',
        data
    })
}
// 添加元组间类型
export function addType(data) {
    return request({
        url: 'ai/component/type/save',
        method: 'post',
        data
    })
}
// 上传元组件（文件）
export function uploadComponent(data) {
    return request({
        url: 'ai/component/upload',
        method: 'post',
        data
    })
}

// 元组件类型列表(没有分页)
export function  getTypeList(params) {
    return request({
        url: 'ai/component/type/list',
        method: 'get',
        params
    })
}

// 删除元组件
export function  deleteCompoment(params) {
    return request({
        url: 'ai/component/delete',
        method: 'delete',
        params
    })
}

// 更新元组件
export function  updateCompoment(data) {
    return request({
        url: 'ai/component/update',
        method: 'post',
        data
    })
}

// 删除元组件类型
export function  deleteType(params) {
    return request({
        url: 'ai/component/type/delete',
        method: 'delete',
        params
    })
}

// 元组件类型列表
export function  getList(params) {
    return request({
        url: 'ai/component/type/page',
        method: 'get',
        params
    })
}