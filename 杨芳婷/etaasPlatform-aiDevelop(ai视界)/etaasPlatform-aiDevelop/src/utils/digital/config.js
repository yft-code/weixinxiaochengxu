// 环境地址
import { base_url } from '@/api/digital/config.js'

export const getBasePath = (type = 'default') => {
    let { NODE_ENV } = process.env;
    switch (type) {
        default:
            return NODE_ENV === 'development' ? '/api' : base_url;
    }
}