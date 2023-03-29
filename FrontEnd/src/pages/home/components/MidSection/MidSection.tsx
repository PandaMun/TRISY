import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ImgInfo } from './ImgInfo';
interface Item {
  imageUrl: string;
  title: string;
}

export default function MidSection() {
  return (
    <S.Section>
      <S.SectionContent>
        {ImgInfo.map((item: Item, index: number) => (
          <S.Card key={index}>
            <S.CardBox>
              <S.ImageBox>
                <img
                  src={item.imageUrl}
                  alt=''
                  className='transition-all duration-300 hover:scale-125'
                />
              </S.ImageBox>
              <S.ContentBox>
                <div className=''>{item.title}</div>
              </S.ContentBox>
            </S.CardBox>
          </S.Card>
        ))}
      </S.SectionContent>
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`min-h-screen mx-auto max-w-7xl`}
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
