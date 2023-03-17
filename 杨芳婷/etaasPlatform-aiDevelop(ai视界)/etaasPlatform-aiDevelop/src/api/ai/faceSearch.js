import request from '@/utils/ai/request'
// 以脸搜脸
export function faceSearch(data){
    return request({
        url: 'ai/face-capture/recognize',
        method: 'post',
        data
    })
}
