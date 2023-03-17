import request from '@/utils/ai/request'
import requestLoad from '@/utils/ai/requestLoad'

//楼层列表
export function getBuildingFloorList(query) {
    return request({
        url: 'ai/building/floor-auth',
        method: 'get',
        params:query
    })
}
//删除模型信息
export function modelDelete(params) {
    return request({
        url: 'ai/building/delete-model',
        method: 'delete',
        params
    })
}


//重复性校验
export function buildingCheck(query) {
    return request({
        url: 'ai/building/check',
        method: 'get',
        params:query
    })
}


//园区列表
export function getBuildingParkList(query) {
    return request({
        url: 'ai/building/park-all',
        method: 'get',
        params:query
    })
}

//建筑列表
export function getBuildingBuildingList(query) {
    return request({
        url: 'ai/building/building-auth',
        method: 'get',
        params:query
    })
}

// 建筑信息分页查询
export function getBuildingPageList(query) {
    return request({
        url: 'ai/building/page-list',
        method: 'get',
        params:query
    })
}

// 保存建筑信息
export function buildingSave(data) {
    return request({
        url: 'ai/building/save',
        method: 'post',
        data
    })
}

//更新建筑信息
export function buildingUpdate(data) {
    return request({
        url: 'ai/building/update',
        method: 'post',
        data
    })
}
//删除建筑信息
export function buildingDelete(params) {
    return request({
        url: 'ai/building/delete-building',
        method: 'delete',
        params
    })
}

//获取建筑详情
export function getBuildingDetailById(query) {
    return request({
        url: 'ai/building/query-id',
        method: 'get',
        params:query
    })
}

//获取模型详情
export function getModelById(query) {
    return request({
        url: 'ai/building/query-model',
        method: 'get',
        params:query
    })
}

//保存模型信息
export function modelSave(data) {
    return request({
        url: 'ai/building/save-model',
        method: 'post',
        data
    })
}

//更新模型信息
export function modelUpdate(data) {
    return request({
        url: 'ai/building/update-model',
        method: 'post',
        data
    })
}

//上传模型文件
export function uploadModel(data) {
    return requestLoad({
        url: 'ai/building/upload-model',
        method: 'post',
        data
    })
}
