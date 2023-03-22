import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import SectionMagazine5 from './components/SectionMagazine5';
import BgGlassmorphism from '~/components/BgGlassmorphism/BgGlassmorphism';
import { usePost } from 'usePost';
import SectionPost from './components/SectionPost';

export default function BlogPage() {
  const { getPost } = usePost();
  const { data: posts, isLoading, error } = getPost;
  if (isLoading) return <div>로딩중</div>;
  if (error) return <div>에러</div>;
  return (
    <S.Box>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      <S.Container>
        {/* SECTION1 */}
        {!posts && <div>게시글이 없습니다.</div>}
        {posts && (
          <>
            <S.SectionMagazine5>
              <SectionMagazine5 posts={posts.filter((_, i) => i >= 0 && i < 4)} />
            </S.SectionMagazine5>
            <SectionPost posts={posts.filter((_, i) => i >= 4)} />
          </>
        )}
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
