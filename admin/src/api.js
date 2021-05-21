const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/',
  // maxContentLength: 8000000,
  // maxBodyLength: 8000000,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('jwt-token');
  const new_config = { ...config };
  if (token) {
    // Add token to header for authorization
    new_config.headers.common.Authorization = `Bearer ${token}`;
  }
  return new_config;
}, (error) => Promise.reject(error));

// instance.interceptors.response.use((config) => config, (error) => {
//   // console.log(JSON.parse(JSON.stringify(error)));
//   // if (error.message === 'Network Error') {
//   //   return axios(error.config);
//   // }
//   return Promise.reject(error);
// });

export default (path, data = null, method = 'post') => {
  if (data === null && method !== 'delete') {
    return instance.get(path);
  } if (method === 'post') {
    return instance.post(path, data);
  } if (method === 'put') {
    return instance.put(path, data);
  }
  return instance.delete(path, { data });
};

export const file_upload = (data) => {
  const form_data = new FormData();
  form_data.append('file', data);
  return instance.post('/upload', form_data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
