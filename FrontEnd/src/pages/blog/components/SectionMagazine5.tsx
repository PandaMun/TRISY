import { board } from '~/types/sharedTypes';
import Card12 from './Card12';
import Card13 from './Card13';

export interface SectionMagazine5Props {
  posts: board[];
}

export const SectionMagazine5 = ({ posts }: SectionMagazine5Props) => {
  return (
    <div className='nc-SectionMagazine5'>
      <div className='text-center mt-10 font-nexon text-xl font-bold'>인기 여행기</div>
      <div className='text-center font-nexon text-base font-bold text-slate-400 mb-2'>
        POULAR TRAVELOG
      </div>
      <div className='grid gap-6 lg:grid-cols-2 md:gap-8'>
        {posts[0] && <Card12 post={posts[0]} />}
        <div className='grid gap-6 md:gap-8'>
          {posts
            .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <Card13 key={index} post={item} className='card13-small' />
            ))}
        </div>
      </div>
    </div>
  );
};
