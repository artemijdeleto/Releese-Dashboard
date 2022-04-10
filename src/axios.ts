import axios from "axios";
import router from "./router";
import store from "./store";

axios.defaults.baseURL = import.meta.env.VITE_APP_API_BASE_URL as string;

let lastResponseTime: number;

axios.interceptors.response.use(response => {

    if (store.getters['user/isLogged'] && response.config.url !== '/token') {

        const current = lastResponseTime = Date.now();
        setTimeout(() => {
            if (current !== lastResponseTime) return;

            axios.post('/token').then(({ data }) => {
                store.dispatch('user/authenticate', data);
                setAuthorization(data);
            });
        }, 10000);

    }

    return response;

}, error => {
    if (error.response) {
        if (error.response.status === 401) {
            store.dispatch('user/logout').then(() => {
                clearAuthorization();
                router.replace({ path: '/get' }).catch(() => {});
            });
        } else if (error.response.status >= 500) {
            console.error('[axios] server error:', { ...error });
        }
    }

    return Promise.reject(error);
});

export const setAuthorization = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const clearAuthorization = () => {
    delete axios.defaults.headers.common['Authorization'];
}

export default axios;
