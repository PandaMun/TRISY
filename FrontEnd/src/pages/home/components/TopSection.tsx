import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function TopSection() {
  return (
    <S.Section>
      <S.LeftSection>
        <S.SiteIntroduction>AI 여행 스케줄링 플래너</S.SiteIntroduction>
        <S.SiteName>TRISY</S.SiteName>
        <button type='button'>시작하기</button>
      </S.LeftSection>
      <S.RightSection>
        <video muted autoPlay loop>
          <source src='./mainVideo/main.mp4' type='video/mp4'></source>
        </video>
      </S.RightSection>
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`grid min-h-screen grid-cols-3`}
  `,
  LeftSection: styled.div`
    ${tw`flex flex-col items-center justify-center col-span-1 space-y-10 max-xl:col-span-3 pb-[100px]`}
    button {
      ${tw`py-5 text-2xl font-bold text-white bg-red-400 rounded px-28`}
    }
  `,
  SiteIntroduction: styled.div`
    ${tw`text-2xl font-bold`}
  `,
  SiteName: styled.div`
    ${tw`font-extrabold text-7xl`}
  `,
  RightSection: styled.div`
    ${tw`col-span-2 max-xl:hidden`}
    video {
      ${tw`object-cover w-full h-full`}
    }
  `,
};
