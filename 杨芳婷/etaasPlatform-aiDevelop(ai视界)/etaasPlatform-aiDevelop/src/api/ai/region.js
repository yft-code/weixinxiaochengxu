import request from '@/utils/ai/request'

// 获取区域查询
export function getAreaPageList(query) {
    return request({
        url: 'ai/area/page-list',
        method: 'get',
        params:query
    })
}

// 添加区域
export function areaSave(data) {
    return request({
        url: 'ai/area/save',
        method: 'post',
        data
    })
}

// 点位绑定区域
export function bindArea(query) {
    return request({
        url: 'ai/area/bind-area',
        method: 'get',
        params:query
    })
}




// 绑定组件点位
export function bindPoint(data) {
    return request({
        url: 'ai/index/bind-point',
        method: 'post',
        data
    })
}

// 区域点位信息查询
export function pointInfo(query) {
    return request({
        url: 'ai/area/point-info',
        method: 'post',
        params:query
    })
}

//更新区域
export function areaUpdate(data) {
    return request({
        url: 'ai/area/update',
        method: 'post',
        data
    })
}
//删除区域
export function areaDelete(params) {
    return request({
        url: 'ai/area/delete',
        method: 'delete',
        params
    })
}


//上传文件创建区域
export function importFile(data) {
    return request({
        url: 'ai/area/import-xls',
        method: 'post',
        data
    })
}