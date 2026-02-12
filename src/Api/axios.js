import axios from 'axios';
import { payment } from './endPoints';

const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

const axiosPrivate = axios.create({
  baseURL: payment,
});

export { axiosInstance, axiosPrivate };
