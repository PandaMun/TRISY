import { setTokens } from './../hooks/useAuth';
import { userLogin, userUpdate } from './../types/sharedTypes';
import { userSignUp } from '~/types/sharedTypes';
import { api, profileApi } from './axiosConfig';
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

// 이메일  중복 확인
export const emailCheckApi = async (email: string) => {
  const response = await api.get(`/user/email/${email}`);
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
  // console.log(response);
  return response.data;
};

// 정보수정
export const updateMyPageApi = async (payload: userUpdate) => {
  // console.log(payload);
  const response = await api.put('/user', payload);
  // console.log(response);
  return response.data;
};

// 프로필 이미지 수정
export const updateProfileImgApi = async (payload: FormData) => {
  // console.log(payload);
  const response = await profileApi.post('/user/profile', payload);
  // console.log(response);
  return response.data;
};

// accesStoken 재발급
export const getAccessToken = async () => {
  try {
    // const localAccToken = localStorage.getItem('accessToken') as string;
    const refreshToken = localStorage.getItem('refreshToken') as string;
    const response = await axios.get('http://j8c202.p.ssafy.io:8080/api/token/refresh', {
      headers: {
        // Authorization: `Bearer ${refreshToken}`,
        refreshToken: `Bearer ${refreshToken}`,
      },
    });
    const headers = response.headers;
    const accessToken = headers['accesstoken'];
    // if ()
    // const newRefToken = response.config.headers.refreshToken;
    // console.log('accessToken:', accessToken);
    const accTokenWithoutBearer = accessToken.replace('Bearer ', '');
    // const refTokenWithoutBearer = newRefToken.replace('Bearer ', '');

    // console.log(headers);
    setTokens(accTokenWithoutBearer, refreshToken);
    return response.data;
  } catch (err) {
    console.log(err);
    const localAccToken = localStorage.getItem('accessToken') as string;
    const refreshToken = localStorage.getItem('refreshToken') as string;
    setTokens(localAccToken, refreshToken);
  }
};

//카카오
export const kakaoLoginCheck = async (code: string) => {
  const response = await api.get(`/oauth/token?code=${code}`);
  // console.log(response);
  // console.log(response.headers);
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
