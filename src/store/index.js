import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		transition: 'slide-fade',
		API_ROOT: process.env.VUE_APP_API_ROOT,
		ACCESS_ROOT: process.env.VUE_APP_ACCESS_ROOT
	},
	mutations: {
	},
	actions: {
	},
	modules: {
	}
})
