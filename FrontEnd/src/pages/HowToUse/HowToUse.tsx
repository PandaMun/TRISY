import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import BgGlassmorphism from '~/components/BgGlassmorphism/BgGlassmorphism';

export const HowToUse = () => {
  return (
    <S.Box>
      <S.Title>4단계로 간편하게 끝내는 여행 스케줄링</S.Title>
      <S.Section>
        <S.TextGrid>
          <h1>1. 여행지 선택</h1>
          <p>
            먼저 여행을 떠날 도시를 선택하세요. <br /> 국내 유명 여행지가 준비되어 있으며,
            지속적으로 업데이트 중입니다. <br /> 도시를 선택하고 간단한 여행 정보들을 확인해보세요.
          </p>
        </S.TextGrid>
        <S.PicGrid className='bg-sky-50'>
          <img src='./howtouseImages/howtouse1.PNG' alt='pic' />
        </S.PicGrid>
      </S.Section>
      <S.Section>
        <S.PicGrid className='bg-sky-100'>
          <img src='./howtouseImages/howtouse2.PNG' alt='pic' />
        </S.PicGrid>
        <S.TextGrid>
          <h1>2. 여행 일정 선택</h1>
          <p>
            여행 일정을 선택하세요. <br /> 간단한 도시 정보를 보며 여행 일정을 계획하세요.
          </p>
        </S.TextGrid>
      </S.Section>
      <S.Section>
        <S.TextGrid>
          <h1>3. 추천을 위한 서베이</h1>
          <p>
            서베이에 응답하면, 더 정확한 여행지를 추천받을 수 있습니다. <br /> 서베이에 응답하지
            않아도 추천 받을 수 있어요 :{')'}
            <br /> 이미 서베이에 응답한 적이 있다면, <br /> 이전 서베이가 저장되어있습니다.
          </p>
        </S.TextGrid>
        <S.PicGrid className='bg-sky-200'>
          <img src='./howtouseImages/howtouse3.PNG' alt='pic' />
        </S.PicGrid>
      </S.Section>
      <BgGlassmorphism />
    </S.Box>
  );
};

const S = {
  Box: styled.section`
    ${tw`p-10 px-48 max-w-[1400px] mx-auto`}
  `,
  Title: styled.h1`
    ${tw`text-4xl font-nexon text-center font-bold`}
  `,
  Section: styled.div`
    ${tw`mt-32 grid grid-cols-2 h-[400px]`}
  `,
  TextGrid: styled.div`
    ${tw`col-span-1 my-auto mx-auto`}
    h1 {
      ${tw`text-2xl font-bold font-nexon`}
    }
    p {
      ${tw`text-sm font-nexon mt-5`}
    }
  `,
  PicGrid: styled.div`
    ${tw`col-span-1 w-full h-[400px] flex justify-center items-center rounded-xl`}
    img {
      ${tw`w-[90%] h-[90%]`}
    }
  `,
};
