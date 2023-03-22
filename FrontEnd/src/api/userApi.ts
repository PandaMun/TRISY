import { userLogin } from './../types/sharedTypes';
import { userSignUp } from '~/types/sharedTypes';
import { api } from './axiosConfig';

// 회원가입
export const signUpApi = async (payload: userSignUp) => {
  const response = await api.post('/user', payload);
  return response.data;
};

// 로그인
export const loginApi = async (payload: userLogin) => {
  const response = await api.post('/users/login', payload);
  return response.data;
};

// get user
export const getUserApi = async () => {
  const response = await api.get('/user/mypage');
  console.log(response);
  return response.data;
};
