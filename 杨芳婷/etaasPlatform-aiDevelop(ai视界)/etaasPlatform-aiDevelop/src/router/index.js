import Vue from 'vue'
import VueRouter from 'vue-router'
import { maps } from "./maps"
import { aiMaps } from "./aimaps"
import { digitalTwin } from './digitalTwin'
Vue.use(VueRouter)

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location){
//    return originalPush.call(this,location).catch(err =>err)
// }


// TODO切换etass路由
const routes = [
	{
		path: '/',
		name: 'main',
		component: resolve => require(["@/views/ai/main"], resolve),
		meta: { title: 'main', icon: '' },
		children: aiMaps.paasMaps
	},
	{
		path: "/monitorCabin",
		name: "monitorCabin",
		component: resolve => require(["@/views/ai/monitorCabin/index"], resolve)
	},
	  {
		path: "/consoleDesk",
		name: "consoleDesk",
		component: resolve =>
		  require(["@/views/ai/consoleDesk/index"], resolve)
	  },
	  {
		path: "/agents",
		name: "agents",
		component: resolve =>
		  require(["@/views/agent/main"], resolve)
	  },
	{
		path: '/',
		name: 'digitalTwin',
		component: resolve => require(["@/views/digital/main"], resolve),
		children: digitalTwin.paasMaps
	},
	//   {
	//     path: '/',
	//     name: 'main',
	// 		redirect: "/index",
	//     component: resolve => require(["@/views/etass/main"],resolve),
	// 		children: maps.paasMaps
	//   },
	{
		path: '/iframe',
		name: 'iframe',
		component: resolve => require(["@/views/etass/iframe"], resolve)
	}
]

const router = new VueRouter({
	routes
})

export default router
