import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'inout',
			component: () => import(/* webpackChunkName: "inout" */ '../components/InOut.vue')
		},
		{
			path: '/login',
			name: 'login',
			component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
		},
		// {
		// 	path: '/details/:id',
		// 	name: 'details',
		// 	props: true,
		// 	component: () => import(/* webpackChunkName: "details" */ '../components/Details.vue')
		// },
		
	]
})