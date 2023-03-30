import styled from 'styled-components';
import tw from 'twin.macro';
import BgGlassmorphism from '~/components/BgGlassmorphism/BgGlassmorphism';
import { SectionPost } from './components/SectionPost';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '../Handle/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { board } from '~/types/sharedTypes';
import { getBoardListApi } from '~/api/boardApi';

export default function BlogPage() {
  const { data: posts, isLoading, error } = useQuery<board[]>(['posts'], getBoardListApi);
  console.log(posts);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;
  if (posts?.length === 0) return <div>게시글이 없습니다.</div>;
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
              {/* <SectionMagazine5 posts={posts.filter((_, i) => i >= 0 && i < 4)} /> */}
            </S.SectionMagazine5>
            <div className='p-10 mb-16 text-3xl font-bold text-center text-white border lg:mb-32 rounded-3xl bg-pink font-nexon'>
              TRISY
            </div>
            <SectionPost posts={posts} />
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
