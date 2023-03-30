import { setTokens } from './../hooks/useAuth';
import { userLogin } from './../types/sharedTypes';
import { userSignUp } from '~/types/sharedTypes';
import { api } from './axiosConfig';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
// 회원가입
export const signUpApi = async (payload: userSignUp) => {
  const response = await api.post('/user', payload);
  return response.data;
};

// 로그인
export const loginApi = async (payload: userLogin) => {
  const response = await api.post('/users/login', payload);
  console.log(response);
  return response.data;
};

// get user
export const getUserApi = async () => {
  // const response = await api.get('/user/mypage');
  const token = localStorage.getItem('accessToken') as string;
  const decoded = jwt_decode(token);
  return decoded;
};

// 마이페이지
export const getMyPageApi = async () => {
  const response = await api.get('/user/mypage');
  return response.data;
};

// accesStoken 재발급
export const getAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken') as string;
  const response = await axios.get('http://j8c202.p.ssafy.io:8080/api/token/refresh', {
    headers: {
      // Authorization: `Bearer ${refreshToken}`,
      refreshToken: `Bearer ${refreshToken}`,
    },
  });
  console.log(response);
  const headers = response.headers;
  const accessToken = headers['accesstoken'];
  const accTokenWithoutBearer = accessToken.replace('Bearer ', '');
  // console.log(accTokenWithoutBearer);
  setTokens(accTokenWithoutBearer, refreshToken);
  return response.data;
  // return accessToken;
};

//카카오
export const kakaoLoginCheck = async (code: string) => {
  const response = await api.get(`/oauth/token?code=${code}`);
  console.log(response);
  console.log(response.headers);
  const headers = response.headers;
  const accessToken = headers['accesstoken'];
  const refreshToken = headers['refreshtoken'];
  const accTokenWithoutBearer = accessToken.replace('Bearer ', '');
  const refTokenWithoutBearer = refreshToken.replace('Bearer ', '');
  setTokens(accTokenWithoutBearer, refTokenWithoutBearer);
  // console.log('AccessToken:', accessToken);?
  // client.invalidateQueries(['user']); // Invalidate user query after login to refetch user data

  return response.data;
};

// export const kakaoLogin = async (code: string) => {
//   const kakaoApiKey = import.meta.env.VITE_KAKAO_API_KEY;
//   const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

//   const requestBody = {
//     grant_type: 'authorization_code',
//     client_id: kakaoApiKey,
//     redirect_uri: kakaoRedirectUri,
//     code,
//   };
//   const response = await kakaoApi.post(`/oauth/token`, requestBody);
//   console.log(response);
//   return response.data;
// };
