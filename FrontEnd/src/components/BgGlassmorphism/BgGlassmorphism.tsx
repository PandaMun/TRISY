import React, { FC } from 'react';

export interface BgGlassmorphismProps {
  className?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = 'absolute inset-x-0 z-0 flex min-h-0 py-64 pl-96 overflow-hidden md:top-0 xl:top-0',
}) => {
  return (
    <div className={`nc-BgGlassmorphism ${className} dark:hidden`} data-nc-id='BgGlassmorphism'>
      <span className='block bg-[#ef233c] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='block bg-[#04868b] w-96 h-96 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000'></span>
    </div>
  );
};

export default BgGlassmorphism;
