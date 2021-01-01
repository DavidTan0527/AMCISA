const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/',
});

// instance.interceptors.request.use((config) => {
//   return config;
// }, (error) => Promise.reject(error));

instance.interceptors.response.use((config) => config, (error) => {
  // console.log(JSON.parse(JSON.stringify(error)));
  if (error.message === 'Network Error') {
    return axios(error.config);
  }
  return Promise.reject(error);
});

const api = (path, data = null) => {
  if (data === null) {
    return instance.get(path);
  }
  return instance.post(path, data);
};

export default api;
