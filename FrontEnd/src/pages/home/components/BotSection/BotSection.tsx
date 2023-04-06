import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { BotCarousel } from './BotCarousel';

export default function BotSection() {
  // console.log(random);
  return (
    <S.Section>
      <div className='text-center mt-10 font-nexon text-xl font-bold'>인기 여행기</div>
      <div className='text-center font-nexon text-base font-bold text-slate-400 mb-2'>
        POULAR TRAVELOG
      </div>
      <BotCarousel />

      {/* <S.SectionMagazine5>
        <SectionMagazine5 posts={random as board[]} />
      </S.SectionMagazine5> */}
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`mx-auto w-3/4`}
  `,
  SectionTitle: styled.div`
    ${tw`text-3xl font-bold text-center font-nexon`}
  `,
  SectionMagazine5: styled.div`
    ${tw`pt-12 pb-16 lg:pb-28`}
  `,
  SectionContent: styled.div`
    ${tw`flex justify-around`}
  `,
  Card: styled.div`
    ${tw`max-w-[250px] max-h-[500px] shadow-xl hover:cursor-pointer`}
  `,
  CardBox: styled.div`
    ${tw`w-full h-full`}
  `,
  ImageBox: styled.div`
    ${tw`overflow-hidden`}
    img {
      ${tw`transition-all duration-300 hover:scale-125`}
    }
  `,
  ContentBox: styled.div`
    ${tw`m-5`}
  `,
};
