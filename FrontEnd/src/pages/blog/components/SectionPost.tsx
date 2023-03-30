import { board, post } from '~/types/sharedTypes';
import Card13 from './Card13';
import Pagination from 'react-js-pagination';
import { useState } from 'react';

export interface SectionMagazine5Props {
  posts: board[];
}

export const SectionPost = ({ posts }: SectionMagazine5Props) => {
  const [activePage, setActivePage] = useState(1);
  const postsPerPage = 5; // Change this value as needed
  const indexOfLastPost = activePage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };
  return (
    <div className='nc-SectionMagazine5'>
      <div className='min-h-[400px]'>
        <div className='grid gap-6 md:gap-8'>
          {currentPosts.map((item, index) => (
            <Card13 key={index} post={item} className='card13-full' />
          ))}
        </div>
      </div>
      <div className='flex justify-center mt-10'>
        <Pagination
          activePage={activePage}
          itemsCountPerPage={postsPerPage}
          totalItemsCount={posts.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass='inline-block px-4 py-2 border-2 rounded-full mx-1 hover:bg-blue-100 hover:cursor-pointer hover:border-blue-300' // Customize the pagination item
          linkClass='text-blue-500 hover:text-blue-700' // Customize the pagination link
          activeClass='bg-blue-400 hover:bg-blue-400 border-blue-500' // Customize the active pagination item
          activeLinkClass='text-white' // Customize the active pagination link
          // disabledClass='text-gray-400 cursor-not-allowed' // Customize the disabled pagination item
        />
      </div>
      <div className='h-96'></div>
    </div>
  );
};
