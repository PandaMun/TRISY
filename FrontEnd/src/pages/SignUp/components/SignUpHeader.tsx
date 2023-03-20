import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export const SignUpHeader = () => {
  return <S.H2>회원가입</S.H2>;
};

const S = {
  H2: styled.h2`
    ${tw`my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center`}
  `,
};
