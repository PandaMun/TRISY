import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import NcImage from '~/components/NcImage/NcImage';
import PostTypeFeaturedIcon from '~/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon';
import { post } from '~/types/sharedTypes';

export interface Card13Props {
  className?: string;
  post: post;
}

const Card13: FC<Card13Props> = ({ className = '', post }) => {
  const { title, content, image } = post;

  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id='Card13'>
      <div className='flex flex-col h-full py-2'>
        <h2 className={`nc-card-title block font-semibold text-base`}>
          <Link to='/' className='line-clamp-2' title={title}>
            {title}
          </Link>
        </h2>
        <span className='hidden my-3 sm:block text-neutral-500 dark:text-neutral-400 '>
          <span className='line-clamp-2'> {content}</span>
        </span>
        {/* <span className='block mt-4 text-sm sm:hidden text-neutral-500 '>{date}</span> */}
        <div className='hidden mt-auto sm:block'>{/* <PostCardMete meta={{ ...post }} /> */}</div>
      </div>

      <Link to='/' className={`block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5`}>
        <NcImage
          containerClassName='absolute inset-0 '
          className='object-cover w-full h-full rounded-xl sm:rounded-3xl'
          src={image}
          alt={title}
        />
        <PostTypeFeaturedIcon
          className='absolute bottom-2 left-2'
          wrapSize='w-8 h-8'
          iconSize='w-4 h-4'
        />
      </Link>
    </div>
  );
};

export default Card13;
