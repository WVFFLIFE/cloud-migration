import authentication from '../b2c';
import axios from 'axios';

const {accessToken} = authentication.getAccessToken();
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:44310/api/migration-jobs'
  : `${window.location.origin}/api/migration-jobs`;

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const resolve = res => res;
const reject = (err, history) => {
  const {status} = err.response;
  if (status === 401) {
    authentication.signOut();
  } 
  
  if (status === 404) {
    history.push('/404')
  }

  return Promise.reject(err);
}

export function initializeHttpClientSettings(history) {
  httpClient.interceptors.response.use(resolve, err => reject(err, history))
}