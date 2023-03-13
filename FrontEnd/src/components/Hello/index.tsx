import logo from '~/logo.svg';
import styled from 'styled-components';
import tw from 'twin.macro';

const Hello = () => {
  return (
    <div className='pt-[100px] w-[70%] mx-auto'>
      <img src={logo} alt='Logo' className='mx-auto h-[150px]' />
      <div className='my-5 text-3xl text-center'>초기 세팅</div>
      <div className='grid grid-cols-3 space-y-3 text-2xl'>
        <div className='col-span-1 space-y-5'>
          <span>Core</span>
          <div>🚀 Vite</div>
          <div>🔥 React</div>
          <div>📖 TypeScript</div>
          <div>🔨 Eslint</div>
          <div>💅 Prettier</div>
        </div>
        <div className='col-span-1 space-y-5 border-x-2'>
          <span>CSS</span>
          <div>🚀 tailwindcss</div>
          <div>🔥 styled-components</div>
          <div>📖 twin.macro</div>
        </div>
        <div className='col-span-1 space-y-5'>
          <span>Other</span>
          <div>🚀 react-router-dom</div>
          <div>🔥 @headlessui/react</div>
          <div>📖 @tanstack/react-query</div>
          <div>🔨 @tanstack/react-query-devtools</div>
        </div>
      </div>
      <TestDiv>Don&apos;t forgot to install Eslint and Prettier in your VSCode</TestDiv>
      <div className='min-h-screen'>qwdqw</div>
    </div>
  );
};

export default Hello;

const TestDiv = styled.div`
  ${tw`flex flex-col items-center justify-center p-12 text-center bg-red-400`}
`;
