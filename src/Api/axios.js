import axios from 'axios';
import { payment } from './endPoints';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Stripe backend (local): http://localhost:5001/clon-2024/us-central1/api
// Hardwired for local testing (prevents handshake/env mismatches).
const axiosPrivate = axios.create({
  baseURL: 'http://localhost:5001/clon-2024/us-central1/api',
});

export { axiosInstance, axiosPrivate };
