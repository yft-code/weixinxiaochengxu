// 区域绑定
import request from '@/utils/ai/request'
// 绑定组件点位
export function getModels() {
    return request({
        url: 'ai/building/park-build-model',
        method: 'get'
    })
}