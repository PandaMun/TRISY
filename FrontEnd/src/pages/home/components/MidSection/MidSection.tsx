import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ImgInfo } from './ImgInfo';
import { MidCarousel } from './MidCarousel';
interface Item {
  imageUrl: string;
  title: string;
}

export default function MidSection() {
  return (
    <S.Section>
      <MidCarousel />
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`min-h-screen mx-auto`}
    width: 70vw;
  `,
  SectionTitle: styled.div`
    ${tw`text-3xl font-bold text-center`}
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
