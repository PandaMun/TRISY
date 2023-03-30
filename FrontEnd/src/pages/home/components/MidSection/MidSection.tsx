import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
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
};
