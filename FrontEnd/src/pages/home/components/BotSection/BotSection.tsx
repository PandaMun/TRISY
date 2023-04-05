import { useQuery } from '@tanstack/react-query';
import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { getRandomBoardListApi } from '~/api/boardApi';
import { Spinner } from '~/components/Shared/Spinner';
import { SectionMagazine5 } from '~/pages/blog/components/SectionMagazine5';
import { board } from '~/types/sharedTypes';

export default function BotSection() {
  const { data: random, isLoading: randomLoading } = useQuery(['random'], getRandomBoardListApi, {
    retry: 5,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
  if (randomLoading) return <Spinner />;
  // console.log(random);
  return (
    <S.Section>
      <S.SectionMagazine5>
        <SectionMagazine5 posts={random as board[]} />
      </S.SectionMagazine5>
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
