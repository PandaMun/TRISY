import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useAuth } from '~/hooks/useAuth';
import SwitchDarkMode from '../SwitchDarkMode/SwitchDarkMode';
import { LoginDropdwon } from './LoginDropdwon';

interface NavSectionProps {
  isScroll: boolean;
}

export default function Nav() {
  const [isScroll, setIsScroll] = useState(true);
  const { useUser } = useAuth();
  const { data: user } = useUser;
  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.pageYOffset < 800 ? setIsScroll(false) : setIsScroll(true);
    });
  }, [isScroll]);

  return (
    <S.NavSection isScroll={isScroll}>
      <S.LeftBox>
        <Link to='/' className='text-3xl font-extrabold font-nexon'>
          TRISY
        </Link>
        <span>TRIP EASY</span>
      </S.LeftBox>
      <S.RightBox>
        <>
          <SwitchDarkMode />
          <Link to='/survey'>취향검사</Link>
          <Link to='/blog'>여행후기</Link>
          <Link to='/howToUse'>이용방법</Link>
          {user && <LoginDropdwon />}
          {!user && <Link to='/login'>로그인</Link>}
        </>
      </S.RightBox>
    </S.NavSection>
  );
}

const S = {
  NavSection: styled.div<NavSectionProps>`
    ${(props) =>
      props.isScroll
        ? tw`bg-white shadow-sm dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200`
        : tw`backdrop-blur-2xl backdrop-filter bg-white/30`};
    ${tw`fixed left-0 right-0 flex justify-between items-center border-b-2 dark:border-none h-[100px] z-20 px-14 min-w-[850px]`}
  `,
  LeftBox: styled.div`
    ${tw`space-x-7`}
  `,
  RightBox: styled.div`
    ${tw`flex items-center justify-center space-x-5 text-xl font-extrabold font-nexon`}
  `,
};
