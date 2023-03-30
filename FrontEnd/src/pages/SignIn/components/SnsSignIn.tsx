import React from 'react';
import KakaoTalgSvg from '/snsImages/KakaoTalk.svg';
import GoogleSvg from '/snsImages/Google.svg';
import styled from 'styled-components';
import tw from 'twin.macro';

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: 'Continue with Kakao',
    href: '#',
    icon: KakaoTalgSvg,
  },
  {
    name: 'Continue with Google',
    href: '#',
    icon: GoogleSvg,
  },
];

export const SnsSignIn = () => {
  const kakaoApi = import.meta.env.VITE_KAKAO_API_KEY;
  const kakaoRedirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  // console.log(kakaoApi, kakaoRedirectUri);
  const kakao = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakaoApi}&redirect_uri=${kakaoRedirectUri}`;
  const handleSuccess = (response: string) => {
    if (response === 'Continue with Kakao') {
      window.location.href = kakao;
    }
  };

  const handleFailure = (error: any) => {
    console.error(error);
  };
  return (
    <S.GridBox>
      {loginSocials.map((item, index) => (
        <S.Button
          key={index}
          type='button'
          onClick={() => {
            handleSuccess(item.name);
          }}
        >
          <img src={item.icon} alt={item.name} />
          <h3>{item.name}</h3>
        </S.Button>
      ))}
    </S.GridBox>
  );
};

const S = {
  GridBox: styled.div`
    ${tw`grid gap-3`}
  `,
  Button: styled.button`
    ${tw`flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]`}
    img {
      ${tw`flex-shrink-0`}
    }
    h3 {
      ${tw`flex-grow text-sm font-medium text-center text-neutral-700 dark:text-neutral-300 sm:text-sm`}
    }
  `,
};
