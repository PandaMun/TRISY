import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import SwitchDarkMode from '../SwitchDarkMode/SwitchDarkMode';
import TestDropdown from './TestDropdown';

interface NavSectionProps {
  isScroll: boolean;
}

export default function Nav() {
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.pageYOffset > 600 ? setIsScroll(true) : setIsScroll(false);
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
      <TestDropdown />
      <S.RightBox>
        <SwitchDarkMode />
        <span>여행지</span>
        <span>마이로</span>
        <span>이용방법</span>
        <Link to='/login'>로그인</Link>
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
    ${tw`fixed left-0 right-0 flex justify-between items-center h-[100px] z-50 border-b-2 px-14`}
  `,
  LeftBox: styled.div`
    ${tw`space-x-7`}
  `,
  RightBox: styled.div`
    ${tw`flex items-center justify-center space-x-5 text-xl font-extrabold font-nexon`}
  `,
};
