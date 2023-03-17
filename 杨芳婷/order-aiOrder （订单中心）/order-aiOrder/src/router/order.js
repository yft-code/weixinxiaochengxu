// AI视界路由
const paasMaps = [
  {
    path: "/ordercenter",
    name: "ordercenter",
    component: resolve => require(["@/views/order/ordercenter/index"], resolve)
  },

];
export const order = {
  paasMaps
};
