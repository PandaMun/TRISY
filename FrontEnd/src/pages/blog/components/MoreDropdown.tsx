import styled from 'styled-components';
import tw from 'twin.macro';
import { AiOutlineMore } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react';
export const MoreDropdown = () => {
  return (
    <Menu as='span'>
      <Menu.Button className=''>
        <AiOutlineMore size={24} />
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
            <button
              type='button'
              className='flex items-center w-full focus:outline-none hover:bg-slate-300'
            >
              <div className='ml-1 font-semibold uppercase shadow-inner text-neutral-700'>
                수정하기
              </div>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              type='button'
              className='flex items-center w-full focus:outline-none hover:bg-slate-300'
            >
              <div className='ml-1 font-semibold uppercase shadow-inner text-neutral-700'>
                삭제하기
              </div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
