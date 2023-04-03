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
import { Link } from 'react-router-dom';

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

  return (
    <div>
      {postDetails && (
        <S.Box>
          {/* Render post details here */}
          <PostTitle title={postDetails.title} />
          <PostWriter memberId={postDetails.memberId} nickname={postDetails.nickname} />
          <Line />
          <S.Viewer
            className='react-quill-viewer'
            dangerouslySetInnerHTML={{ __html: postDetails.content }}
          />
          {/* <img src={postDetails.image} alt={postDetails.title} /> */}
        </S.Box>
      )}
      <Link
        to='/'
        className='p-10 mt-16 text-3xl font-bold text-center text-white border rounded-3xl bg-pink font-nexon max-w-4xl mx-auto block'
      >
        TRISY
      </Link>
    </div>
  );
};

const S = {
  Box: styled.section`
    ${tw`max-w-4xl mx-auto mt-12`}
  `,
  Container: styled.div`
    ${tw`container relative mx-auto`}
  `,
  SectionMagazine5: styled.div`
    ${tw`pt-12 pb-16 lg:pb-28`}
  `,
  Viewer: styled.div`
    ${tw`min-h-[600px] border-b-2 pb-5`}
    ol {
      ${tw`list-decimal list-inside`}
    }
    ul {
      ${tw`list-disc list-inside`}
    }
  `,
};
