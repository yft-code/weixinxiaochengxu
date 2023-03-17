import request from '@/utils/ai/request'
// 获取邮箱配置信息
export function getConfig(params) {
    return request({
        url: 'ai/mail/get-config',
        method: 'get',
        params
    })
}

// 发邮件信息
export function sendTest(params) {
    return request({
        url: 'ai/mail/send-test',
        method: 'get',
        params
    })
}

// 保存邮箱配置信息
export function saveConfig(data) {
    return request({
        url: 'ai/mail/config',
        method: 'post',
        data
    })
}

