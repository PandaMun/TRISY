import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { SignInForm } from './components/SignInForm';
import { SigninHeader } from './components/SigninHeader';
import { SnsSignIn } from './components/SnsSignIn';

export const SignIn = () => {
  return (
    <S.Container>
      <SigninHeader />
      <S.Box>
        <SnsSignIn />
        {/* OR */}
        <S.OrBox>
          <span>OR</span>
          <div></div>
        </S.OrBox>
        <SignInForm />
        <S.NewUser>
          회원이 아니세요? {` `}
          <Link to='/signup' className='font-bold text-primary-700 dark:text-primary-300'>
            회원가입하기
          </Link>
        </S.NewUser>
      </S.Box>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    ${tw`w-full min-h-screen px-6 mx-auto`}
  `,
  Box: styled.div`
    ${tw`max-w-md mx-auto space-y-6`}
  `,
  OrBox: styled.div`
    ${tw`relative text-center`}
    span {
      ${tw`relative z-10 inline-block px-4 text-sm font-medium bg-white dark:text-neutral-400 dark:bg-neutral-900`}
    }
    div {
      ${tw`absolute left-0 w-full transform -translate-y-1/2 border top-1/2 border-neutral-100 dark:border-neutral-800`}
    }
  `,
  NewUser: styled.span`
    ${tw`block text-center text-neutral-700 dark:text-neutral-300`}
  `,
};
