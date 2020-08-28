import authentication from '../b2c';
import axios from 'axios';

const {accessToken} = authentication.getAccessToken();
const BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:44310/api/migration-jobs'
  : `${window.location.origin}/api/migration-jobs`;

const service = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

service.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response.status === 401) {
    authentication.signOut();
  } else {
    return error;
  }
})

export default service;