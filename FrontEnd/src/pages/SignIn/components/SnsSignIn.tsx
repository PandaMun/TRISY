import React from 'react';
import FacebookSvg from '/snsImages/Facebook.svg';
import TwitterSvg from '/snsImages/Twitter.svg';
import GoogleSvg from '/snsImages/Google.svg';
import styled from 'styled-components';
import tw from 'twin.macro';

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: 'Continue with Facebook',
    href: '#',
    icon: FacebookSvg,
  },
  {
    name: 'Continue with Twitter',
    href: '#',
    icon: TwitterSvg,
  },
  {
    name: 'Continue with Google',
    href: '#',
    icon: GoogleSvg,
  },
];

export const SnsSignIn = () => {
  return (
    <S.GridBox>
      {loginSocials.map((item, index) => (
        <S.Button key={index} type='button'>
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
