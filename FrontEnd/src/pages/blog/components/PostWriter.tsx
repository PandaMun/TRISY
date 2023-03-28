import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Avatar } from '~/components/Shared/Avatar';
import { SnsShare } from '~/components/Shared/SnsShare';
import { MoreDropdown } from './MoreDropdown';
export const PostWriter = () => {
  return (
    <S.Box>
      <S.Container>
        <Avatar containerClassName='flex-shrink-0' sizeClass='w-5 h-5 sm:h-7 sm:w-7 ' />
        <S.Info>
          <S.NameBox>펩시제로라임</S.NameBox>
          <S.DateBox>2023.03.23</S.DateBox>
        </S.Info>
      </S.Container>
      <div className='flex items-center justify-center pt-1.5 space-x-3'>
        <SnsShare />
        <MoreDropdown />
      </div>
    </S.Box>
  );
};

const S = {
  Box: styled.section`
    ${tw`flex items-baseline justify-between mt-3`}
  `,
  Container: styled.div`
    ${tw`flex flex-wrap items-center flex-shrink-0 text-sm leading-none text-left text-neutral-700 dark:text-neutral-200`}
  `,
  Info: styled.div`
    ${tw`flex ml-3 space-x-2`}
  `,
  NameBox: styled.div`
    ${tw``}
  `,
  DateBox: styled.div`
    ${tw`text-neutral-400`}
  `,
};
