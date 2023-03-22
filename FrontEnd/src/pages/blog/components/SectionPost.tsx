import React, { FC, useState } from 'react';
import { post } from '~/types/sharedTypes';
import Card13 from './Card13';
import Pagination from 'react-js-pagination';

export interface SectionMagazine5Props {
  posts: post[];
}

const SectionPost: FC<SectionMagazine5Props> = ({ posts }) => {
  const [activePage, setActivePage] = useState(1);
  const postsPerPage = 3; // Change this value as needed
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
            <Card13 key={index} post={item} />
          ))}
        </div>
      </div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={postsPerPage}
        totalItemsCount={posts.length}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        itemClass='inline-block px-2 py-1' // Customize the pagination item
        linkClass='text-blue-500 hover:text-blue-700' // Customize the pagination link
        activeClass='bg-blue-200' // Customize the active pagination item
        activeLinkClass='cursor-default text-white' // Customize the active pagination link
        // disabledClass='text-gray-400 cursor-not-allowed' // Customize the disabled pagination item
      />
      <div className='h-96'></div>
    </div>
  );
};

export default SectionPost;
