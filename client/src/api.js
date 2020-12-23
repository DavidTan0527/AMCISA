const axios = require('axios');

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3000/',
});

// instance.interceptors.request.use((config) => {
//   return config;
// }, (error) => Promise.reject(error));

const api = (path, data = null) => {
  // console.log(window.localStorage.getItem('uni'));
  if (data === null) {
    return instance.get(path);
  }
  return instance.post(path, data);
};

export default api;
