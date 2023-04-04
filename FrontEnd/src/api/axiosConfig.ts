// Import necessary axios types and functions
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// const hostname = window && window.location && window.location.hostname;
// const BASE_URL =
//   hostname !== 'localhost' ? 'http://j8c202.p.ssafy.io:8080/api' : 'http://localhost:8080/api';
const BASE_URL = 'http://j8c202.p.ssafy.io:8080/api';
// const BOARD_BASE_URL =
//   hostname !== 'localhost'
//     ? 'http://j8c202.p.ssafy.io:8080/trisy/api'
//     : 'http://localhost:8080/trisy/api';
const BOARD_BASE_URL = 'http://j8c202.p.ssafy.io:8080/trisy/api';

const MOCK_URL = 'http://localhost:5000';

const mockApi = axios.create({ baseURL: MOCK_URL });

const profileApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

const imageApi = axios.create({
  baseURL: BOARD_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json',
  },
});

const boardApi = axios.create({
  baseURL: BOARD_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Create an axios instance with the specified configuration
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Function to set the Authorization header if a token is available in localStorage
const setAuthTokenHeader = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (accessToken && refreshToken && accessToken !== 'undefined') {
    config.headers = {
      ...config.headers,
      accessToken: `Bearer ${accessToken}`,
      // refreshToken: `Bearer ${refreshToken}`,
    };
  }
  return config;
};

// Function to handle request errors
const handleRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

// Function to handle response errors
const handleResponseError = (error: AxiosError): Promise<AxiosError> => {
  // Add common error handling here, such as handling 401 Unauthorized errors
  return Promise.reject(error);
};

// Function to handle successful responses
const handleResponseSuccess = (response: AxiosResponse): AxiosResponse => {
  // You can also handle common successful response scenarios here
  return response;
};

// Add the request interceptor with a type assertion to bypass the type error
api.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

boardApi.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

imageApi.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

profileApi.interceptors.request.use(
  (config) => setAuthTokenHeader(config as AxiosRequestConfig) as any,
  handleRequestError,
);

// Add the response interceptor for handling successful responses and errors
api.interceptors.response.use(handleResponseSuccess, handleResponseError);
boardApi.interceptors.response.use(handleResponseSuccess, handleResponseError);
imageApi.interceptors.response.use(handleResponseSuccess, handleResponseError);
profileApi.interceptors.response.use(handleResponseSuccess, handleResponseError);

// Export the configured axios instance for use in other parts of the application
export { api, mockApi, boardApi, imageApi, profileApi };
