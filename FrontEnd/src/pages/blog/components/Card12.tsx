import { Link } from 'react-router-dom';
import NcImage from '~/components/NcImage/NcImage';
import { PostCardMeta } from '~/components/Shared/PostCardMeta';
import { board } from '~/types/sharedTypes';
import { htmlToPlainText } from '~/utils/htmlToPlainText';

export interface Card12Props {
  post: board;
}

const Card12 = ({ post }: Card12Props) => {
  const { id, title, content, thumbnailUrl, createdTime } = post;
  const date = new Date(createdTime as string);
  const formattedDate = date.toISOString().slice(0, 10);

  return (
    <div className={`lg:relative flex flex-row-reverse lg:flex-col h-full`}>
      <Link
        to={`/post/${formattedDate}/${id}`}
        className='relative flex-grow flex-shrink-0 block w-1/3 overflow-hidden lg:w-full aspect-w-4 aspect-h-3 rounded-3xl'
      >
        <NcImage containerClassName='absolute inset-0' src={thumbnailUrl} alt={title} />
      </Link>

      <div className='flex flex-col w-2/3 pr-10 mb-8 lg:mt-8 lg:w-full'>
        <h2 className={`nc-card-title`}>
          <Link to={`/post/${formattedDate}/${id}`} className='line-clamp-1' title={title}>
            {title}
          </Link>
        </h2>
        <span className='hidden mt-4 sm:block text-neutral-500 dark:text-neutral-400'>
          <Link to={`/post/${formattedDate}/${id}`} className='line-clamp-2' title={title}>
            {htmlToPlainText(content)}
          </Link>
        </span>
        <span className='block mt-4 text-sm sm:hidden text-neutral-500 '>2022.12.12</span>
        <div className='hidden mt-auto sm:block'>
          <PostCardMeta className='mt-8' meta={post} />
        </div>
      </div>
    </div>
  );
};

export default Card12;
