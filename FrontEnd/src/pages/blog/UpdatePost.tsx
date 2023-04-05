import styled from 'styled-components';
import tw from 'twin.macro';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getBoardById, updateBoardApi } from '~/api/boardApi';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '../Handle/ErrorPage';
import { Link } from 'react-router-dom';
import { Line } from '~/components/Shared/Line';
import { Button } from '~/components/Shared/Button';
import { UpdateEditor } from './components/UpdateEditor';

export const UpdatePost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: postDetails,
    isLoading,
    isError,
  } = useQuery(['post', id], () => getBoardById(id as string));
  const location = useLocation();
  const url = location.state.url;
  // console.log(url);

  // state
  const [htmlStr, setHtmlStr] = useState<string>('');
  const [title, setTitle] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  // console.log(postDetails);
  useEffect(() => {
    setTitle(postDetails?.title as string);
    setHtmlStr(postDetails?.content as string);
  }, [postDetails]);

  useEffect(() => {
    if (url !== 'noImg') {
      setThumbnailUrl(url);
    }
  }, [url]);

  // ref
  const viewContainerRef = useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const { mutate } = useMutation(updateBoardApi, {
    onSuccess: (data) => {
      console.log('Post updated:', data);
      setTitle('');
      setHtmlStr('');
      navigate(`/blog`);
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });
  const handleUpdatePost = () => {
    console.log(postDetails?.thumbnailUrl);
    if (thumbnailUrl === null) {
      setThumbnailUrl(postDetails?.thumbnailUrl as string);
      console.log(thumbnailUrl);
      return;
    }
    console.log(thumbnailUrl);
    mutate({
      title: title,
      content: htmlStr,
      tourId: id as string,
      thumbnailUrl,
    });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorPage />;

  return (
    <S.Box>
      <S.GridContainer>
        <S.GridLeft>
          <Link to='/' className='text-3xl font-bold pl-5'>
            TRiSY
          </Link>
          <Line />
        </S.GridLeft>
        <S.GridCenter>
          {/* <TextEditor value={content} onChange={handleTextChange} /> */}
          <UpdateEditor
            htmlStr={htmlStr}
            setHtmlStr={setHtmlStr}
            setThumbnailUrl={setThumbnailUrl}
            initialContent={postDetails?.content as string}
          />
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='제목을 입력해주세요'
            className='absolute top-0 mt-12 p-3 py-5 border-b-2 rounded-none text-xl z-40 border-t-2 focus:outline-none focus:border-b-red-100 focus:border-t-[#E9EBEE]'
          />
        </S.GridCenter>
        <S.GridRight>
          <Button
            type='button'
            className='create-post-button bg-black mr-5'
            text='수정'
            onClick={handleUpdatePost}
          />
          <Line />
        </S.GridRight>
      </S.GridContainer>
    </S.Box>
  );
};

const S = {
  Box: styled.section`
    ${tw`fixed top-0 left-0 bottom-0 right-0 z-30 min-h-screen bg-white min-w-[880px] dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200`}
  `,
  GridContainer: styled.div`
    ${tw`grid grid-cols-6 pt-5`}
  `,
  GridLeft: styled.div`
    ${tw`col-span-1 border-white`}
  `,
  GridCenter: styled.div`
    ${tw`col-span-4 relative`}
  `,
  GridRight: styled.div`
    ${tw`col-span-1 text-right`}
  `,
};
