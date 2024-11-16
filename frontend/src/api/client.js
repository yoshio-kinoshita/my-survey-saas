// 例: src/api/client.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

console.log(`process.env.REACT_APP_API_URL: ${process.env.REACT_APP_API_URL}`);

export default apiClient;