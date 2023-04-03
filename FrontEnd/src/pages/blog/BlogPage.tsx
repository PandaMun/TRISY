import styled from 'styled-components';
import tw from 'twin.macro';
import BgGlassmorphism from '~/components/BgGlassmorphism/BgGlassmorphism';
import { SectionPost } from './components/SectionPost';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '../Handle/ErrorPage';
import { board } from '~/types/sharedTypes';
import { SectionMagazine5 } from './components/SectionMagazine5';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBoardListApi, getRandomBoardListApi } from '~/api/boardApi';
import { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';

export default function BlogPage() {
  const client = useQueryClient();
  const [posts, setPosts] = useState<board[]>([]); // <--- add state for posts
  const [activePage, setActivePage] = useState(1);
  const { isLoading, error, data } = useQuery(['boards'], () => getBoardListApi('0'), {
    retry: 2,
  });
  const { data: random, isLoading: randomLoading } = useQuery(['random'], getRandomBoardListApi, {
    retry: 5,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
  console.log(data);
  console.log(random);

  useEffect(() => {
    const response = getBoardListApi(String(activePage - 1));
    response.then((res) => {
      setPosts(res.content);
    });
  }, [activePage]);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    client.invalidateQueries(['boards']);
  };
  console.log(isLoading, randomLoading);

  if (isLoading || randomLoading) return <Spinner />;
  if (error) return <ErrorPage />;
  if (!posts || posts.length === 0) return <div></div>; // <--- check for empty array

  const sorted = posts.sort((a, b) => Number(b.id) - Number(a.id));

  return (
    <S.Box>
      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />
      <S.Container>
        {/* SECTION1 */}
        {!posts || (posts.length === 0 && <div>게시글이 없습니다.</div>)}
        {posts && (
          <>
            <S.SectionMagazine5>
              <SectionMagazine5 posts={random as board[]} />
            </S.SectionMagazine5>
            <div className='p-10 mb-16 text-3xl font-bold text-center text-white border lg:mb-32 rounded-3xl bg-pink font-nexon'>
              TRISY
            </div>
            <SectionPost posts={sorted as board[]} />
          </>
        )}
      </S.Container>
      <div className='flex justify-center mt-10'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={data?.numberOfElements}
          totalItemsCount={data?.totalElements as number}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass='inline-block px-4 py-2 border-2 rounded-full mx-1 hover:bg-blue-100 hover:cursor-pointer hover:border-blue-300' // Customize the pagination item
          linkClass='text-blue-500 hover:text-blue-700' // Customize the pagination link
          activeClass='bg-blue-400 hover:bg-blue-400 border-blue-500' // Customize the active pagination item
          activeLinkClass='text-white' // Customize the active pagination link
          // disabledClass='text-gray-400 cursor-not-allowed' // Customize the disabled pagination item
        />
      </div>
      <div className='h-96'></div>
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
