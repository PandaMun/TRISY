import styled from 'styled-components';
import tw from 'twin.macro';
import { FacebookIcon, FacebookShareButton } from 'react-share';
import { TwitterIcon, TwitterShareButton } from 'react-share';
import { LineIcon, LineShareButton } from 'react-share';
import { useLocation } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { CiShare1 } from 'react-icons/ci';

export const SnsShare = () => {
  const location = useLocation();
  const path = `http://localhost:3000${location.pathname}`;
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(path);
    alert('URL을 복사하였습니다..');
  };
  return (
    <Menu as='span'>
      <Menu.Button className=''>
        <AiOutlineShareAlt size={24}></AiOutlineShareAlt>
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Menu.Items className='absolute space-y-3 right-0 py-5 px-2 z-10 mt-2 w-[180px] origin-top-right rounded-md shadow-lg ring-1 bg-white ring-black ring-opacity-5'>
          <Menu.Item>
            <S.SnsDiv>
              <FacebookShareButton url={path} className='flex'>
                <FacebookIcon size={24} round={true} borderRadius={24}></FacebookIcon>
                <S.ShareText>페이스북으로 공유</S.ShareText>
              </FacebookShareButton>
            </S.SnsDiv>
          </Menu.Item>
          <Menu.Item>
            <S.SnsDiv>
              <TwitterShareButton url={path} className='flex'>
                <TwitterIcon size={24} round={true} borderRadius={24}></TwitterIcon>
                <S.ShareText>트위터로 공유</S.ShareText>
              </TwitterShareButton>
            </S.SnsDiv>
          </Menu.Item>
          <Menu.Item>
            <S.SnsDiv>
              <LineShareButton url={path} className='flex'>
                <LineIcon size={24} round={true} borderRadius={24}></LineIcon>
                <S.ShareText>라인으로 공유</S.ShareText>
              </LineShareButton>
            </S.SnsDiv>
          </Menu.Item>
          <Menu.Item>
            <button
              type='button'
              className='flex items-center w-full focus:outline-none hover:bg-slate-300'
              onClick={handleCopyUrl}
            >
              <CiShare1 size={24} />
              <div className='ml-1 font-semibold uppercase shadow-inner text-neutral-700'>
                URL 복사하기
              </div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

const S = {
  SnsDiv: styled.div`
    ${tw`hover:bg-slate-300`}
  `,
  ShareText: styled.div`
    ${tw`ml-1 font-semibold uppercase shadow-inner text-neutral-700`}
  `,
};
