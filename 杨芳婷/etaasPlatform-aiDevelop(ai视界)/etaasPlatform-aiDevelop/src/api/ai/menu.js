import request from "@/utils/ai/request";
// 菜单
export function getMenu(data) {
  return request({
    url: "uc/custom/getMenus?platId=10006",
    method: "post",
    data
  });
}

// 获取用户菜单
export function getMenuByUser(data) {
  return request({
    url: 'uc/custom/getMenus?platId=10002',
    method: 'post',
    data
  })
}