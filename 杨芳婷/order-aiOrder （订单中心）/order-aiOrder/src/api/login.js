import request from '@/utils/ai/request'

//通过手机号登录
export function loginPhone(data) {
    return request({
        url: 'uc/sys/login-telephone',
        method: 'post',
        data
    })
}
// 通过手机号获取验证码
export function loginCode(data) {
    return request({
        url: 'uc/sys/send-msm',
        method: 'post',
        data
    })
}
// 通过用户名登录
export function login(data) {
    return request({
     // url: "ai/sys/user/login",
      url: "uc/login",
      method: "post",
      data
    });
  }
//注册
export function  register(data) {
    return request({
        url: 'uc/sys/register',
        method: 'post',
        data
    })
}

//验证码
export function sendMsg(data) {
     return request({
     url: 'uc/sys/send-msm',
     method: 'post',
     params:data
     })
    }
//账户是否冲突
export function isAccountConflict(query) {
    return request({
        url: 'uc/user/isAccountConflict',
        method: 'get',
        params:query
    })
}

//手机号是否冲突 
export function isPhoneConflict(query) {
    return request({
        url: 'uc/user/isPhoneConflict',
        method: 'get',
        params:query
    })
}