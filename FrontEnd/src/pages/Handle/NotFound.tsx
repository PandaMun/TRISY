import React from 'react';
import { Link } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';

export const NotFound = () => {
  return (
    <div className='bg-pink-50 h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-bold text-pink-500 mb-4'>404</h1>
      <p className='text-xl text-pink-500 mb-8'>Oops! 페이지를 찾을 수 없어요.</p>
      <Fade>
        <Link to='/'>
          <button
            className='bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded'
            type='button'
          >
            홈으로 돌아가기
          </button>
        </Link>
      </Fade>
    </div>
  );
};
