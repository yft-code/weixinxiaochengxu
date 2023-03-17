import request from '@/utils/ai/request'
// 获取分页人员
export function getUser(params) {
    return request({
        url: 'ai/face/face-info/page-list',
        method: 'get',
        params
    })
}

// 更新用户
export function updateUser(data) {
    return request({
        url: 'ai/face/face-info/update',
        method: 'post',
        data
    })
}

// 删除用户
export function deleteUser(params) {
    return request({
        url: 'ai/face/face-info/delete',
        method: 'post',
        params
    })
}
// 新增用户
export function AddUser(data) {
    return request({
        url: 'ai/face/face-info/insert',
        method: 'post',
        data
    })
}
export function addImg(data) {
    return request({
        url: 'ai/blacklist/uploadBlackHeader',
        method: 'post',
        data
    })
}
//上传用户头像
export function uploadFile(data) {
    return request({
        url: "ai/alarm/event/upload",
        method: "post",
        data
    });
}
//白名单
export function WhiteUpdate(params) {
    return request({
        url: 'ai/blacklist/inactivate',
        method: 'get',
        params
    })
}
//设置黑名单
export function blackUpdate(params) {
    return request({
        url: 'ai/blacklist/activate',
        method: 'get',
        params
    })
}

// 获取人脸数据列表
export function faceList(params) {
    return request({
        url: 'ai/face/face-db/page-list',
        method: 'get',
        params
    })
}

// 添加人脸数据列表
export function addFace(data) {
    return request({
        url: 'ai/face/face-db/insert',
        method: 'post',
        data
    })
}

// 编辑人脸数据列表
export function editFace(data) {
    return request({
        url: 'ai/face/face-db/update',
        method: 'post',
        data
    })
}

// 删除人脸数据列表
export function deleteFace(params) {
    return request({
        url: 'ai/face/face-db/delete',
        method: 'post',
        params
    })
}

// 获取所有的人脸库
export function allFace(params) {
    return request({
        url: 'ai/face/face-db/all',
        method: 'get',
        params
    })
}