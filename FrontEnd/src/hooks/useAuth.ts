import { loginApi, signUpApi } from '../api/userApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
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
      console.log(data);
    },
    onError: (error, variable, context) => {
      // console.log(error);
    },
    onSettled: () => {
      // console.log('end');
    },
  });
  return { useSignUp, useLogin };
};
