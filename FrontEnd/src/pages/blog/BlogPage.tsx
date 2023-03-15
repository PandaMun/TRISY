import React from 'react';
import { DEMO_POSTS } from '../../data/posts';
import styled from 'styled-components';
import tw from 'twin.macro';
import SectionMagazine5 from './components/SectionMagazine5';
import BgGlassmorphism from '~/components/BgGlassmorphism/BgGlassmorphism';

// DEMO DATA
const POSTS = DEMO_POSTS;

// DEMO POST FOR MAGAZINE SECTION
const MAGAZINE1_POSTS = POSTS.filter((_, i) => i >= 0 && i < 8);

export default function BlogPage() {
  return (
    <S.Box>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      <S.Container>
        {/* SECTION1 */}
        <S.SectionMagazine5>
          <SectionMagazine5 posts={MAGAZINE1_POSTS} />
        </S.SectionMagazine5>
      </S.Container>
    </S.Box>
  );
}

const S = {
  Box: styled.section`
    ${tw`relative overflow-hidden`}
  `,
  Container: styled.div`
    ${tw`container relative mx-auto`}
  `,
  SectionMagazine5: styled.div`
    ${tw`pt-12 pb-16 lg:pb-28`}
  `,
};
