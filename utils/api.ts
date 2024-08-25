import axios from 'axios';

const $axios = axios.create({
  // baseURL: process.env.BASE_URL || 'http://localhost:5000/api', // Adjust the base URL as needed
  baseURL:  'http://localhost:5000/api', // Adjust the base URL as needed
});

export { $axios };
