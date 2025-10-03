import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:5000/api', // Your Flask backend URL
  withCredentials: true, // This is crucial for sending/receiving session cookies
});

export default apiClient;