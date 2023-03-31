import styled from 'styled-components';
import tw from 'twin.macro';
import { useEffect, useRef, useState } from 'react';
// import TextEditor from './components/PostEditor';
import { Button } from '~/components/Shared/Button';
import { Link, useParams } from 'react-router-dom';
import { Line } from '~/components/Shared/Line';
import { useMutation } from '@tanstack/react-query';
import { createBoardApi } from '~/api/boardApi';
// import { board } from '~/types/sharedTypes';
import { TextEditor } from './components/TextEditor';

export const CreatePost = () => {
  // state
  const [htmlStr, setHtmlStr] = useState<string>('');

  // ref
  const viewContainerRef = useRef<HTMLDivElement>(null);

  // useEffect
  useEffect(() => {
    if (viewContainerRef.current) {
      viewContainerRef.current.innerHTML = '<h2>html 코드를 이용하여 만들어지는 View입니다.</h2>';
      viewContainerRef.current.innerHTML += htmlStr;
    }
  }, [htmlStr]);

  const { id } = useParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [thumbnailUrl] = useState('');

  // const { data: tours } = useQuery<board[]>(['tours'], getTourListApi);
  // console.log(tours);

  const { mutate } = useMutation(createBoardApi, {
    onSuccess: (data) => {
      console.log('Post created:', data);
      setTitle('');
      setHtmlStr('');
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });
  const handleCreatePost = () => {
    console.log(htmlStr);
    const cleanedHtml = htmlStr.replace(/<p><\/p>/g, '');
    console.log(cleanedHtml);

    mutate({
      title: title,
      content: htmlStr,
      tourId: id as string,
      thumbnailUrl,
    });
  };
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
          <TextEditor htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
          <div>
            <h2>Editor를 통해 만들어진 html 코드입니다.</h2>
            {htmlStr}
          </div>
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
            text='완료'
            onClick={handleCreatePost}
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
