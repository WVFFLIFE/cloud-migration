import authentication from '../b2c';
import axios from 'axios';

const {accessToken} = authentication.getAccessToken();
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:44310/api/migration-jobs'
  : `${window.location.origin}/api/migration-jobs`;

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const resolve = res => res;
const reject = history => err => {
  const {status} = err.response;
  if (status === 401) {
    authentication.signOut();
  } else if (status === 404) {
    history.push('/404')
  } else {
    return Promise.reject(err);
  }
}

function initializeHttpClientSettings(history) {
  httpClient.interceptors.response.use(resolve, reject(history))
}

export {httpClient, initializeHttpClientSettings}