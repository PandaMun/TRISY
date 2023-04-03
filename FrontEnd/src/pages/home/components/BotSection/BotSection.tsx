import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRandomBoardListApi } from '~/api/boardApi';

interface Item {
  img: string;
  title: string;
  desc: string;
}

const arr: Item[] = [
  { img: './mainImage/jeju.jpg', title: 'JEJU', desc: '대한민국 제주도' },
  { img: './mainImage/jeju.jpg', title: 'JEJU', desc: '대한민국 제주도' },
  { img: './mainImage/jeju.jpg', title: 'JEJU', desc: '대한민국 제주도' },
  { img: './mainImage/jeju.jpg', title: 'JEJU', desc: '대한민국 제주도' },
];

export default function BotSection() {
  const { data: random, isLoading: randomLoading } = useQuery(['random'], getRandomBoardListApi, {
    retry: 5,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
  console.log(random);
  return (
    <S.Section>
      <S.SectionTitle>여행기</S.SectionTitle>
      <S.SectionContent>
        {arr.map((item: Item, index: number) => (
          <S.Card key={index}>
            <S.CardBox>
              <S.ImageBox>
                <img
                  src={item.img}
                  alt=''
                  className='transition-all duration-300 hover:scale-125'
                />
              </S.ImageBox>
              <S.ContentBox>
                <div className=''>{item.title}</div>
                <div className=''>{item.desc}</div>
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
    ${tw`text-3xl font-bold text-center font-nexon`}
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
