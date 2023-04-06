import { board } from '~/types/sharedTypes';
import Card13 from './Card13';
export interface SectionMagazine5Props {
  posts: board[];
}

export const SectionPost = ({ posts }: SectionMagazine5Props) => {
  return (
    <div className='nc-SectionMagazine5 mt-10'>
      <h2 className='font-nexon font-bold text-3xl'>여행기</h2>
      <h3 className='mb-3'>TRAVELOG</h3>
      <div className='min-h-[400px]'>
        <div className='grid gap-6 md:gap-8'>
          {posts.map((item, index) => (
            <Card13 key={index} post={item} className='card13-full' />
          ))}
        </div>
      </div>
    </div>
  );
};
