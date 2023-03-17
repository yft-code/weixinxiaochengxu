import request from '@/utils/ai/request'
// 分页查询邮件模版
export function getEmailModel(params) {
    return request({
        url: 'ai/email-template/page-list',
        method: 'get',
        params
    })
}

// 删除邮件模板
export function deleteEmailModel(params) {
    return request({
        url: 'ai/email-template/delete',
        method: 'post',
        params
    })
}

// 新增邮件模版
export function addEmailModel(data) {
    return request({
        url: 'ai/email-template/insert',
        method: 'post',
        data
    })
}

// 获取内置事件变量和地点变量
export function getEmailVerity(params) {
    return request({
        url: 'ai/email-template/listVar',
        method: 'get',
        params
    })
}

// 更新邮件模版
export function updateEmailModel(data) {
    return request({
        url: 'ai/email-template/update',
        method: 'post',
        data
    })
}

// 启用模板
export function updateActiveEmail(params) {
    return request({
        url: 'ai/email-template/updateActive',
        method: 'post',
        params
    })
}


// 检查邮件模版是否已经和预警关联，关联则返回所有的预警名称
export function checkBind(params) {
    return request({
        url: 'ai/email-template/checkBind',
        method: 'get',
        params
    })
}


// 检查模版名称是否冲突
export function isNameConflict(params) {
    return request({
        url: 'ai/email-template/isNameConflict',
        method: 'get',
        params
    })
}
