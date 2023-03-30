import { getUserApi, getMyPageApi, getAccessToken } from './../api/userApi';
import { loginApi, signUpApi } from '../api/userApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const useAuth = () => {
  const [, setIsLogin] = useState(false);

  const client = useQueryClient();
  const navigate = useNavigate();

  //회원가입
  const useSignUp = useMutation(signUpApi, {
    onSuccess: async () => {
      navigate('/login');
    },
  });
  // 토큰 갱신
  const useRefreshToken = useQuery(['ref'], getAccessToken, {
    enabled: !!localStorage.getItem('refreshToken'),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    refetchInterval: 30000, // 30초마다 Query를 다시 실행합니다.
  });

  //로그인
  const useLogin = useMutation(loginApi, {
    onSuccess: async (data) => {
      const refreshToken = data['refreshToken'];
      const accessToken = data['accessToken'];
      setIsLogin(true);
      setTokens(accessToken, refreshToken);
      navigate('/');
      client.invalidateQueries(['user']); // Invalidate user query after login to refetch user data
    },
    onError: (error, variable, context) => {
      console.log(error);
      console.log(variable);
      console.log(context);
    },
  });

  //로그아웃
  const logout = () => {
    removeTokens();
    navigate('/');
    setIsLogin(false);
    client.setQueryData(['user'], null);
  };

  //유저 정보
  const useUser = useQuery(['user'], getUserApi, {
    enabled: !!localStorage.getItem('accessToken'), // Fetch user data only if logged in
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
      logout();
    },
  });

  //마이페이지
  const useMyPage = useQuery(['mypage'], getMyPageApi, {
    enabled: !!localStorage.getItem('accessToken'), // Fetch user data only if logged in
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { useSignUp, useLogin, logout, useUser, useMyPage, useRefreshToken };
};
