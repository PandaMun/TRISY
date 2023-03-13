import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import TestDropdown from './TestDropdown';

export default function Nav() {
  return (
    <S.NavSection>
      <S.LeftBox>
        <span className='font-sans text-3xl font-extrabold'>야 여기어때 놀자</span>
        <span>MAKE YOUR ROUTE OPTIMIZED</span>
      </S.LeftBox>
      <TestDropdown />
      <S.RightBox>
        <span>여행지</span>
        <span>마이로</span>
        <span>이용방법</span>
        <span>로그인</span>
      </S.RightBox>
    </S.NavSection>
  );
}

const S = {
  NavSection: styled.div`
    ${tw`fixed left-0 right-0 flex justify-between h-[100px] bg-slate-300 backdrop-blur-2xl backdrop-filter`}
  `,
  LeftBox: styled.div`
    ${tw`space-x-7`}
  `,
  RightBox: styled.div`
    ${tw`space-x-5 text-xl font-extrabold`}
  `,
};
