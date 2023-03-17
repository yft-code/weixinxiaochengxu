import request from "@/utils/ai/request";
// 登录
export function login(data) {
  return request({
   // url: "ai/sys/user/login",
    url: "/login",
    method: "post",
    data
  });
}

//验证码
export function code(query) {
  return request({
      url: 'uc/custom/kaptcha',
      method: 'get',
      params:query
  })
}

//验证码验证
export function checkCode(data) {
  return request({
      url: 'uc/custom/checkKaptcha',
      method: 'post',
      data
  })
}