import request from '@/utils/ai/request'
// 获取树
export function getOrganization() {
  return request({
    url: 'ai/hidden/tree-list',
    method: 'get'
  })
}
// 添加节点
export function addChild(data) {
  return request({
    url: 'ai/hidden/add-child',
    method: 'post',
    data
  })
}
// 删除节点
export function deleteById(params) {
  return request({
    url: 'ai/hidden/delete',
    method: 'delete',
    params
  })
}
// 编辑
export function updateHidden(data) {
  return request({
    url: 'ai/hidden/update',
    method: 'post',
    data
  })
}

// 添加隐患点
export function addPoint(data) {
  return request({
    url: 'ai/hidden-trouble-info/insert',
    method: 'post',
    data
  })
}

// 编辑隐患点
export function  editPoint(data) {
  return request({
    url: 'ai/hidden-trouble-info/updateById',
    method: 'post',
    data
  })
}

// 上传图片
export function addImg(data) {
  return request({
    url: 'ai/hidden-trouble-info/upload-img',
    method: 'post',
    data
  })
}

// 隐患库列表
export function getLists(params) {
  return request({
    url: 'ai/hidden-trouble-info/page-list',
    method: 'get',
    params
  })
}

// 删除隐患点
export function deletePoint(params) {
  return request({
    url:'ai/hidden-trouble-info/deleteById',
    method: 'delete',
    params
  })
}

// 新增隐患图集     
export function addImgLists(data) {
  return request({
    url:'ai/hidden-trouble-info/atlas-batch-insert',
    method: 'post',
    data
  })
}

// 获取图集列表
export function getImgsLists(params) {
  return request({
    url: 'ai/hidden-trouble-info/atlas',
    method: 'get',
    params
  })
}

// 批量删除图集列表
export function deleteImgsLists(data) {
  return request({
    url: 'ai/hidden-trouble-info/atlas-batch-delete',
    method: 'post',
    data
  })
}
