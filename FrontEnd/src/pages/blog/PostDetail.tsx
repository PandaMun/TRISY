import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PostTitle } from './components/PostTitle';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PostWriter } from './components/PostWriter';
import { Line } from '~/components/Shared/Line';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '../Handle/ErrorPage';
import { getBoardById } from '~/api/boardApi';
import { Fade } from 'react-awesome-reveal';

export const PostDetail = () => {
  const { id } = useParams<{ id: string; formattedDate: string }>();
  const {
    data: postDetails,
    isLoading,
    isError,
  } = useQuery(['post', id], () => getBoardById(id as string));
  console.log(postDetails);
  if (isLoading) return <Spinner />;
  if (isError) return <ErrorPage />;

  setTimeout(() => {
    const fadeOutText = document.querySelector('.fade-out-text');
    fadeOutText?.classList.add('fade-out');
  }, 14000);

  return (
    <div>
      {postDetails && (
        <S.Box>
          {/* Render post details here */}
          <PostTitle title={postDetails.title} />
          <PostWriter
            memberId={postDetails.memberId}
            nickname={postDetails.nickname}
            profileUrl={postDetails.profileUrl}
          />
          <Line />
          <S.Viewer
            className='react-quill-viewer'
            dangerouslySetInnerHTML={{ __html: postDetails.content }}
          />
          {/* <img src={postDetails.image} alt={postDetails.title} /> */}
        </S.Box>
      )}
      <div className='p-10 text-3xl font-bold text-center text-white border rounded-3xl bg-pink font-nexon max-w-4xl mx-auto'>
        <div className='fade-out-text'>
          <Fade duration={8000} className='relative'>
            <p className='absolute top-2 left-0 right-11 mr-10'>TRIP</p>
          </Fade>
          <Fade duration={8000} delay={5000} className='relative'>
            <p className='absolute top-2 left-11 right-0 ml-10'>EASY</p>
          </Fade>
        </div>
        <Fade duration={7000} delay={14500}>
          <p className='text-5xl'>TRISY</p>
        </Fade>
      </div>
    </div>
  );
};

const S = {
  Box: styled.section`
    ${tw`max-w-4xl mx-auto min-h-[90vh]`}
  `,
  Container: styled.div`
    ${tw`container relative mx-auto`}
  `,
  SectionMagazine5: styled.div`
    ${tw`pt-12 pb-16 lg:pb-28`}
  `,
  Viewer: styled.div`
    ${tw`min-h-[800px] border-b-2 pb-5`}
    ol {
      ${tw`list-decimal list-inside`}
    }
    ul {
      ${tw`list-disc list-inside`}
    }
  `,
};
