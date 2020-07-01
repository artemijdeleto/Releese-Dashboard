import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router);

const routes = [
];

const router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
});

export default router
