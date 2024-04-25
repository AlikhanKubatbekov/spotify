import axios from 'axios';
import {apiURL} from './constans';

const axiosApi = axios.create({
  baseURL: apiURL
});

export default axiosApi;