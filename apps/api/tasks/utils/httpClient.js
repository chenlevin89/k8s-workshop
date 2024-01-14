const axios = require("axios");
const asyncLocalStorage = require('../utils/asyncLocalStorage');

axios.interceptors.request.use(function (config) {
    const store = asyncLocalStorage.getStore() || {};
    Object.entries(store).forEach(([key,value]) => {
        config.headers[key] = value;
    })
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

module.exports = axios;