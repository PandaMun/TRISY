import { getUserApi } from './../api/userApi';
import { loginApi, signUpApi } from '../api/userApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

const removeTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const useAuth = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  //회원가입
  const useSignUp = useMutation(signUpApi, {
    onMutate: (variable) => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      navigate('/login');
    },
    onError: (error, variable, context) => {
      // console.log(error);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  //로그인
  const useLogin = useMutation(loginApi, {
    onMutate: (variable) => {
      // console.log('onMutate', variable);
    },
    onSuccess: async (data, variables) => {
      const refreshToken = data['refresh-token'];
      const accessToken = data['access-token'];
      setTokens(accessToken, refreshToken);
      navigate('/');
      client.invalidateQueries(['user']); // Invalidate user query after login to refetch user data
    },
    onError: (error, variable, context) => {
      console.log(error);
      console.log(variable);
      console.log(context);
    },
    onSettled: () => {
      // console.log('end');
    },
  });

  //로그아웃
  const logout = () => {
    removeTokens();
    navigate('/');
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
    },
  });

  return { useSignUp, useLogin, logout, useUser };
};
