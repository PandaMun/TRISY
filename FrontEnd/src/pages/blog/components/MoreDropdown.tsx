import styled from 'styled-components';
import tw from 'twin.macro';
import { AiOutlineMore } from 'react-icons/ai';
import { Menu, Transition } from '@headlessui/react';
import { Button } from '~/components/Shared/Button';
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
        <Menu.Items className='absolute space-y-3 right-0 py-5 px-2 z-10 mt-2 w-[100px] rounded-md shadow-lg ring-1 bg-white ring-black ring-opacity-5'>
          <Menu.Item>
            <Button type='button' className='more-dropdown-button' text='수정하기' />
          </Menu.Item>
          <Menu.Item>
            <Button type='button' className='more-dropdown-button' text='삭제하기' />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};