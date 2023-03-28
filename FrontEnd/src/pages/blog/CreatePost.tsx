import styled from 'styled-components';
import tw from 'twin.macro';
import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './components/PostEditor';
import { Button } from '~/components/Shared/Button';
import { Link } from 'react-router-dom';
import { Line } from '~/components/Shared/Line';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTextChange = (value: string) => {
    setContent(value);
  };
  const createPost = async () => {
    try {
      const response = await axios.post('http://localhost:5000/posts', {
        title: title,
        content: content,
        image:
          'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
      });
      console.log('Post created:', response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
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
          <TextEditor value={content} onChange={handleTextChange} />
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
            onClick={createPost}
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
