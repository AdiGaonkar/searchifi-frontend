import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-for-thesearchifi.onrender.com', // adjust for production
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
