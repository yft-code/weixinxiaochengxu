//数字路由
const paasMaps = [
  {
    path: "index",
    name: "index",
    component: resolve => require(["@/views/digital/views/main.vue"], resolve)
  },
  
];
export const digitalTwin = {
  paasMaps
};
