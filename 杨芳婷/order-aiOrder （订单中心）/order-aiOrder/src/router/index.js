import Vue from 'vue'
import VueRouter from 'vue-router'
import { order } from "./order"
Vue.use(VueRouter)



// TODO切换etass路由
const routes = [
	{
	   path:'/',
	   redirect:'/index'
	},
	// {
	// 	path: '/login',
	// 	name: 'login',
	// 	redierct:'/login',
	// 	component: resolve => require(["@/views/login/index"],resolve),
	// },
	{
		path: '/index',
		name: 'index',
		component: resolve => require(["@/views/mall/index"],resolve),
	},
	{
		path: '/order',
		name: 'order',
		component: resolve => require(["@/views/order/main"],resolve),
		children: order.paasMaps
	},

]

const router = new VueRouter({
  routes
})

export default router
