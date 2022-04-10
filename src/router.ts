import {
	createRouter,
	createWebHistory,
	NavigationGuardNext,
	RouteLocationNormalized,
	RouteRecordRaw
} from 'vue-router'
import Artists from './views/Artists.vue'
import Login from './views/Login.vue'
import Releases from './views/Overview.vue'
import ReleaseEdit from './views/ReleaseEdit.vue'
import {
  authenticate,
  canBeAuthenticated,
  getAuthenticationToken,
  getUserInformationUsingToken
} from "./service/AuthenticationService";
import store from "./store";
import axios, {clearAuthorization, setAuthorization} from "./axios";

const history = createWebHistory();
const router = createRouter({
	history: history,
	linkActiveClass: '',
	linkExactActiveClass: 'active',
	routes: [
    {
      path: '/enter',
      meta: {
        allow: 'guest',
        layout: 'EmptyLayout'
      },
      component: Login
    },
		{
			path: '/releases',
			component: Releases
		},
		{
			path: '/releases/add',
			component: ReleaseEdit
		},
		{
			path: '/releases/:id/edit',
			component: ReleaseEdit
		},
		{
			path: '/artists',
			component: Artists
		},
		// {
		// 	path: '/releases/test',
		// 	component: () => import(/* webpackChunkName: "editor" */ './views/Editor.vue')
		// },
		({
			path: '/oauth2/adsr/callback',
			meta: {
				allow: 'all'
			},
			async beforeEnter(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
				try {
					if (!to.query.hasOwnProperty('code')) {
						return next();
					}

					const token = await getAuthenticationToken(to.query.code as string);
					const user = await getUserInformationUsingToken(token);

					setAuthorization(token);
					await store.dispatch('authenticate', {
						token,
						user
					});

					next('/');
				} catch (e) {
					console.error(e);
					next('/');
				}
			},
		} as any) as RouteRecordRaw,
    {
			path: '/:pathMatch(.*)*',
			redirect: '/releases'
		},
	]
});

const navigate = ({ meta: { allow } }: RouteLocationNormalized, next: NavigationGuardNext) => {
	if (allow === 'all') {  // available for all
		next();
	} else {
		const logged = store.getters['isLogged'];
		console.info('logged', logged)
		if (allow === 'guest') {  // only for unauthenticated users
			logged ? next('/releases') : next();
		} else { // only for authenticated users
			logged ? next() : next('/enter');
		}
	}

	// store.state.loading = false;
}

router.beforeEach((to, from, next) => {

	if (store.getters.isLogged) {
		return navigate(to, next);
	}

	if (!canBeAuthenticated()) {
		return navigate(to, next);
	}

  authenticate().finally(() => navigate(to, next));

});

export default router;
