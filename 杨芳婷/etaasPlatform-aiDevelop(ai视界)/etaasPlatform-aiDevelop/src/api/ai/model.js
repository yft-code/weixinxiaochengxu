import request from "@/utils/ai/request";
export function parkBuildModel(params) {
    return request({
        url: 'ai/building/park-build-model',
        method: 'get',
        params
    })
}
