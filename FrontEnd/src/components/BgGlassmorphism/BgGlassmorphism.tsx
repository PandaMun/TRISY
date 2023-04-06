import React, { FC } from 'react';

export interface BgGlassmorphismProps {
  className?: string;
}

const BgGlassmorphism: FC<BgGlassmorphismProps> = ({
  className = 'absolute left-0 inset-x-0 z-10 flex overflow-hidden md:top-0 xl:top-0',
}) => {
  return (
    <div className={`nc-BgGlassmorphism ${className} dark:hidden`} data-nc-id='BgGlassmorphism'>
      <span className='block bg-[#ef233c] w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96'></span>
      <span className='block bg-[#04868b] w-96 h-96 -ml-20 mt-40 rounded-full mix-blend-multiply filter blur-3xl opacity-10 lg:w-96 lg:h-96 nc-animation-delay-2000'></span>
    </div>
  );
};

export default BgGlassmorphism;
