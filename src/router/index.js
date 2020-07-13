import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/views/Login.vue'

Vue.use(Router);

const routes = [
	{
		path: '/login',
		component: Login
	}
];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router
