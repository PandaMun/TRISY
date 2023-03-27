import React from 'react';

export const Spinner = () => {
  return (
    <div className='flex flex-col items-center justify-center mt-[300px]'>
      <span className='pb-3 text-3xl font-bold'>로딩중</span>
      <div className='w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin'></div>
    </div>
  );
};
