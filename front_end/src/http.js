import axios from "axios";
import auth from "./services/auth";
import store from "./store";
import { logout } from "./actions";

import { host } from "./constants";
// Set config defaults when creating the instance
const http = axios.create({
  baseURL: host
});

// Add a request interceptor
http.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    const token = auth.getToken();
    config.headers = { Authorization: `Bearer ${token}` };
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
http.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    if (
      error.response.status === 401 &&
      error.response.config &&
      !error.response.config.__isRetryRequest
    ) {
      return store.dispatch(logout());
    }
    return Promise.resolve(error);
  }
);

export default http;
