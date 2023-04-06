import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const links = [
  { href: '/', label: 'home' },
  { href: '/hello', label: 'hello' },
  { href: '/blog', label: 'blog' },
  { href: '/createPost', label: 'createPost' },
  { href: '/mypage', label: 'mypage' },
  { href: '/myinfo', label: '내 정보' },
  { href: '/myreview', label: '여행후기' },
  { href: '/mytrip', label: '여행기록' },
];

export default function TestDropdown() {
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex justify-center w-full p-3 text-gray-700 bg-blue-300 border-2 rounded-m'>
        DevDropdown
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'
      >
        <Menu.Items className='absolute right-0 py-5 px-2 z-10 mt-2 w-[180px] origin-top-right rounded-md bg-[#8EB2FA] shadow-lg ring-1 ring-black ring-opacity-5'>
          {links.map((link) => (
            <Menu.Item key={link.href}>
              {({ active }) => (
                <Link
                  to={link.href}
                  className={`${
                    active ? 'bg-blue-200 text-white' : 'bg-white text-black'
                  } block py-2 border-b-3`}
                >
                  {link.label}
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
