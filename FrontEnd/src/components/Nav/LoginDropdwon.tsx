import { Menu, Transition } from '@headlessui/react';
import { Button } from '~/components/Shared/Button';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useAuth } from '~/hooks/useAuth';

export const LoginDropdwon = () => {
  const { logout } = useAuth();
  return (
    <Menu as='span'>
      <Menu.Button className='mt-2 text-2xl'>
        <GiHamburgerMenu />
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
            <Link className='more-dropdown-button' to='/myinfo'>
              마이 페이지
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Button
              type='button'
              className='more-dropdown-button'
              text='로그아웃'
              onClick={logout}
            />
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
