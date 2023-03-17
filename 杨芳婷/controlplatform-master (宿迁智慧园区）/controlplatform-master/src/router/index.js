import Vue from 'vue'
import VueRouter from 'vue-router'
import { aiMaps } from "./aimaps"
Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location){
//    return originalPush.call(this,location).catch(err =>err)
// }


// TODO切换etass路由
const routes = [
	{
		path: '/',
		redirect:'/largeScreen'
	},
	{
		path: '/largeScreen',
		name: 'largeScreen',
		component: resolve => require(["@/views/largeScreen/index"], resolve),
		meta: { title: 'main', icon: '' },
	},
	{
		path: '/index',
		name: 'index',
		component: resolve => require(["@/views/index/index"], resolve),
		meta: { title: 'main', icon: '' },
		children: aiMaps.paasMaps
	},

]

const router = new VueRouter({
	routes
})

export default router
