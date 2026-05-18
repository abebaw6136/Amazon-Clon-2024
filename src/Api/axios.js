import axios from 'axios';
import { payment } from './endPoints';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

// Stripe backend (live)
// Your function is deployed at: https://<region>-<project>.cloudfunctions.net/api
// Keeping baseURL ending at `/api` avoids path concatenation bugs like `/charge/payment/create`.
const axiosPrivate = axios.create({
  baseURL: 'https://us-central1-clone-2024.cloudfunctions.net/api',
});


export { axiosInstance, axiosPrivate };
