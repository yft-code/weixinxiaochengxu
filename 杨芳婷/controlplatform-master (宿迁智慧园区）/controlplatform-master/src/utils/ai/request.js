import axios from 'axios'
import { Message } from 'element-ui'
import router from '../../router'
import  store from '../../store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 90000
})

// 请求方法处理
service.interceptors.request.use(
  config => {
    // if(router.currentRoute.name=='agent'){
 
    // } else {
    //   router.replace('/')
    // }
    // }
    if(router.currentRoute.name=='agent'){
      if(store.state.isLogin){
        if (localStorage.getItem('token')||sessionStorage.getItem('token')) {
          if(JSON.parse(localStorage.getItem('token'))['aiHorizon']||JSON.parse(sessionStorage.getItem('token'))['aiHorizon']){
            config.headers['Authorization'] = JSON.parse(localStorage.getItem('token'))['aiHorizon']||JSON.parse(sessionStorage.getItem('token'))['aiHorizon']
          }
      }
    }
  }else{
      if (localStorage.getItem('token')||sessionStorage.getItem('token')) {
        if(JSON.parse(localStorage.getItem('token'))['aiHorizon']||JSON.parse(sessionStorage.getItem('token'))['aiHorizon']){
          config.headers['Authorization'] = JSON.parse(localStorage.getItem('token'))['aiHorizon']||JSON.parse(sessionStorage.getItem('token'))['aiHorizon']
        }
    }else{
      router.replace('/')
    }
  }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 返回响应处理
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      // 后台返回的报错
      if (res.message && res.message.indexOf('用户名或密码') > -1) {
        router.replace('/')
      } else if (res.code === 403) {
        router.replace('/')
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }else if(res.code === 401) {
        router.replace('/')
      } else {
        Message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('error' + error.response.status) // for debug
    if( error.response.status === 401){
      router.replace('/')
    }else{
      return Promise.reject(error)
    }
  }
)

export default service
