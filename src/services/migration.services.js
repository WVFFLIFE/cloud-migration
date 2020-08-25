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
  }
})

export default service;

// async function request(uri, method = 'GET', body = null) {
//   const token = await authentication.getAccessToken();
//   const postOptions = body ? { body: JSON.stringify(body) } : {};

//   return await fetch(uri, {
//     method,
//     headers: {
//       Authorization: `Bearer ${token.accessToken}`,
//       'Content-Type': 'application/json'
//     },
//     ...postOptions
//   });
// }

// class MigrationService {
//   BASE_URL = process.env.NODE_ENV === 'development' 
//     ? 'http://localhost:44310/api/migration-jobs' 
//     : `${window.location.origin}/api/migration-jobs`;

//   get = async (path = '') => {
//     const uri = `${this.BASE_URL}${path}`;

//     const res = await request(uri);

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       }
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return await res.json();
//   };

//   put = async (path = '', body) => {
//     const uri = `${this.BASE_URL}${path}`;

//     const res = await fetch(uri, {
//       method: 'PUT',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(body)
//     });

//     if (!res.ok) {
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return await res.json();
//   };

//   post = async (path = '', body) => {
//     const uri = `${this.BASE_URL}${path}`;

//     const res = await request(uri, 'POST', body);

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       }
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return await res.json();
//   };

//   postStep = async (path = '', body) => {
//     const uri = `${this.BASE_URL}${path}`;

//     const res = await request(uri, 'POST', body);

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       }
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return true;
//   };

//   delete = async (path = '') => {
//     const uri = `${this.BASE_URL}${path}`;

//     const res = await request(uri, 'DELETE');

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       }
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return true;
//   };

//   validate = async (path = '', body) => {
//     const uri = `${this.BASE_URL}${path}`;
//     const res = await request(uri, 'POST', body);

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       } else {
//         try {
//           const { message } = await res.json();

//           return {
//             status: 'error',
//             message
//           };
//         } catch {

//           throw new Error(`Couldn't fetch ${uri}`);
//         }
//       }
//     }

//     const { message, ...rest } = await res.json();

//     return {
//       status: 'success',
//       message,
//       ...rest
//     };
//   };

//   download = async (path = '') => {
//     const uri = `${this.BASE_URL}${path}`;
//     const token = await authentication.getAccessToken();

//     const res = await fetch(uri, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token.accessToken}`,
//       }
//     })

//     if (!res.ok) {
//       if (res.status === 401) {
//         authentication.signOut();
//       }
//       throw new Error(`Couldn't fetch ${uri}`);
//     }

//     return await res.blob();
//   }
// }

// export default new MigrationService();