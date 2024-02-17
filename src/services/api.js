import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.20.192.1:8082',
  proxy: false,
});

export default api;
