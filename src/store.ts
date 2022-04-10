import { createStore } from "vuex";
import { getReleases } from "./service/ReleaseService";
import {getPlatforms} from "./service/PlatformService";

export default createStore({
	state: {
		user: {
			id: null,
			username: null
		},
    loading: true,
    releases: [],
    platforms: [],
    transition: 'slide-fade',
	},
	getters: {
		isLogged: state => state.user.id !== null,
		user: state => state.user
	},
	actions: {
		authenticate({ state }, payload) {
			localStorage.setItem('sc.auth.token', payload.token);
			state.user.id = payload.user.userIdentifier;
			state.user.username = payload.user.username;
		},
		logout({ state }) {
			localStorage.removeItem('sc.auth.token');
			// state.user.id = null;
		},
    async fetchReleases({ state }) {
      state.releases = await getReleases();
    },
    async fetchPlatforms({ state }) {
      state.platforms = await getPlatforms();
    }
	}
});
