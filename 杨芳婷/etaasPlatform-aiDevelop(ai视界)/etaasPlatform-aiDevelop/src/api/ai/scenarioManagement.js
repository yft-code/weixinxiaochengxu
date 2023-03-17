import request from '@/utils/ai/request'

//  监管场景分页列表
export function scenePageList(query) {
    return request({
        url: 'ai/scene/page-list',
        method: 'get',
        params:query
    })
}


export function listDepart(query) {
    return request({
        url: 'ai/sys/depart/list-depart',
        method: 'get',
        params:query
    })
}
// 新增场景信息
export function sceneSave(data) {
    return request({
        url: 'ai/scene/save',
        method: 'post',
        data
    })
}
//  场景详情页查询
export function sceneQueryDetails(query) {
    return request({
        url: 'ai/scene/query-detail',
        method: 'get',
        params:query
    })
}

//  详情页更新场景信息
export function sceneUpdateDetails(data) {
    return request({
        url: 'ai/scene/update-details',
        method: 'put',
        data
    })
}

//  删除场景
export function sceneDelete(query) {
    return request({
        url: 'ai/scene/delete-id',
        method: 'Delete',
        params:query
    })
}

//查询员工归属组织
export function queryUserId(query) {
    return request({
        url: 'uc/user/queryById',
        method: 'get',
        params:query
    })
}

// 员工分页列表查询
export function userPageList(query) {
    return request({
        //url: 'ai/sys/user/page-list',
        url: 'uc/user/queryByParameters',
        method: 'post',
        params:query
    })
}

// 所属机构
export function getUserListOrg(query) {
    return request({
        url: 'ai/sys/user/list-org',
        method: 'get',
        params:query
    })
}


//所属部门（级联）
export function getUserDetailInfo(params) {
    return request({
        url: 'uc/customAI/queryOrgTreesByUserId',
        method: 'get',
        params
    })
}

// 返回所有可用的时间模版

export function getListActiveTemplate(params) {
    return request({
        url: 'ai/time-template/listActiveTemplate',
        method: 'get',
        params
    })
}