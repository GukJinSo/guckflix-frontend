import axios from 'axios';
import apiConfig from './apiConfig';
import queryString from 'query-string';

const axiosCustom = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-type': 'application/json',
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
      // language: apiConfig.language,
    }),
});

export default axiosCustom;
