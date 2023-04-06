import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { userLogin } from '~/types/sharedTypes';
import { useAuth } from '~/hooks/useAuth';
// import { surveyCheckApi } from '~/api/boardApi';

const schema = yup
  .object({
    email: yup.string().email('이메일 형식으로 입력해주세요.').required('이메일를 입력해주세요.'),
    password: yup.string().required('비밀번호를 입력해주세요.'),
  })
  .required();

export const SignInForm = () => {
  const { useLogin } = useAuth();

  // react-hook-form, yup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLogin>({
    resolver: yupResolver(schema),
  });

  // 로그인
  const onSignIn: SubmitHandler<userLogin> = async (data) => {
    useLogin.mutate(data);
  };
  return (
    <S.SignInForm onSubmit={handleSubmit(onSignIn)}>
      <S.EmailLabel>
        <span>이메일</span>
        <S.Input type='email' placeholder='이메일을 입력해주세요' {...register('email')}></S.Input>
        <S.ErrorMsg>{errors.email?.message}</S.ErrorMsg>
      </S.EmailLabel>
      <S.PasswordLabel>
        <span>
          비밀번호
          {/* <Link to='/login' className='text-sm'>
            비밀번호를 잊으셨나요?
          </Link> */}
        </span>
        <S.Input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          autoComplete='off'
          {...register('password')}
        ></S.Input>
        <S.ErrorMsg>{errors.password?.message}</S.ErrorMsg>
      </S.PasswordLabel>
      <S.Button type='submit'>Continue</S.Button>
    </S.SignInForm>
  );
};

const S = {
  SignInForm: styled.form`
    ${tw`grid grid-cols-1 gap-6`}
  `,
  EmailLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`text-neutral-800 dark:text-neutral-200`}
    }
  `,
  PasswordLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`flex items-center justify-between text-neutral-800 dark:text-neutral-200`}
    }
  `,
  Input: styled.input`
    ${tw`block w-full px-4 py-3 mt-1 text-sm bg-white border-2 border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 rounded-2xl`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-xs font-bold text-red-400`}
  `,
  Button: styled.button`
    ${tw`px-4 py-3 sm:px-6 disabled:bg-opacity-70 rounded-2xl bg-primary-600 hover:bg-primary-700 text-neutral-50`}
  `,
};
