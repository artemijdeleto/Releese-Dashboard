import axios, { clearAuthorization, setAuthorization } from "../axios";
import store from "../store";

const LOCAL_STORAGE_TOKEN_KEY = 'sc.auth.token';

const extractAuthenticationToken = () => localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

export const canBeAuthenticated = () => !!extractAuthenticationToken();

export const authenticate = async () => {
  const token = extractAuthenticationToken();
  if (!token) {
    return;
  }

  try {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const { data } = await axios('/api/v1/security/me');
    store.dispatch('authenticate', { token, user: data }).then(() => setAuthorization(token));
  } catch (e) {
    console.log(e, typeof e);
    store.dispatch('logout').then(() => clearAuthorization());
  }
}

export const getAuthenticationToken = async (code: string) => {
  const response = await axios.get(`/api/v1/security/oauth/adsr/callback?code=${code}`);

  return response.data.token;
}

export const getUserInformationUsingToken = async (token: string) => {
  const response = await axios.get(`/api/v1/security/me`, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  });

  return response.data;
}
