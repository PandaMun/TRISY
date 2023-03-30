import React from 'react';
import { board } from '~/types/sharedTypes';
import { Avatar } from './Avatar';

export interface PostCardMetaProps {
  className?: string;
  meta: board;
  hiddenAvatar?: boolean;
  size?: 'large' | 'normal';
}

export const PostCardMeta = ({
  className,

  size = 'normal',
  hiddenAvatar = false,
}: PostCardMetaProps) => {
  // const { date, author } = meta;
  return (
    <div
      className={`inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 ${
        size === 'normal' ? 'text-sm' : 'text-base'
      } ${className}`}
    >
      <span className='relative flex items-center flex-shrink-0 space-x-2'>
        {!hiddenAvatar && (
          <Avatar
            radius='rounded-full'
            sizeClass={size === 'normal' ? 'h-7 w-7 text-sm' : 'h-10 w-10 text-xl'}
          />
        )}
        <span className='block font-medium text-neutral-6000 hover:text-black dark:text-neutral-300 dark:hover:text-white'>
          John Doe
        </span>
      </span>
      <>
        <span className='text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium'>·</span>
        <span className='font-normal text-neutral-500 dark:text-neutral-400 line-clamp-1'>
          2023.03.27
        </span>
      </>
    </div>
  );
};
