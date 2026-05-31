import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const baseURL = API_URL ? API_URL.replace(/\/+$/, '') : '';

if (!baseURL) {
  throw new Error('VITE_API_URL is not defined. Set it in your Vite environment or Vercel dashboard.');
}

axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
