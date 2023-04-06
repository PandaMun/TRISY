import React from 'react';
import { Link } from 'react-router-dom';
import { Fade, Hinge } from 'react-awesome-reveal';

export const NotFound = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center font-nexon'>
      <h1 className='text-4xl font-bold text-pink-500 mb-4'>404</h1>
      <Fade>
        <Link to='/'>
          <button
            className='bg-red-200 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded'
            type='button'
          >
            홈으로 돌아가기
          </button>
        </Link>
      </Fade>
      <Hinge duration={3000} cascade triggerOnce>
        <p className='text-xl mb-8'>Oops! 에러가 발.생.했.어.요</p>
        <p className='text-xl mb-8'>Oops! 에러가 발.생.했.어.요</p>
        <p className='text-xl mb-8'>Oops! 에러가 발.생.했.어.요</p>
      </Hinge>
    </div>
  );
};
