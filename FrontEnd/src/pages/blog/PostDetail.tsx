import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getPostById } from '~/api/postApi';
import { PostTitle } from './components/PostTitle';
import styled from 'styled-components';
import tw from 'twin.macro';
import { PostWriter } from './components/PostWriter';
import { Line } from '~/components/Shared/Line';
import { post } from '~/types/sharedTypes';

interface PostDetailProps {
  content: string;
}

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: postDetails,
    isLoading,
    isError,
  } = useQuery(['post', id], () => getPostById(id as string));

  function convertHtmlToPlainText(html: PostDetailProps['content']) {
    const dom = new DOMParser().parseFromString(html, 'text/html');
    return dom.body.textContent || '';
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading post</p>;
  }

  return (
    <div>
      {postDetails && (
        <S.Box>
          {/* Render post details here */}
          <PostTitle title={postDetails.title} />
          <PostWriter />
          <Line />
          <p>내용 : {convertHtmlToPlainText(postDetails.content)}</p>
          <img src={postDetails.image} alt={postDetails.title} />
        </S.Box>
      )}
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
};
