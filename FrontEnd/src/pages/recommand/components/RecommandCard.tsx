import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppDispatch } from '~/app/hooks';
import { pickPlace } from '../recommandSlice';
interface CardInfo {
  src: string;
  title: string;
  id: number;
}
export const RecommandCard = ({ title, src, id }: CardInfo) => {
  const dispatch = useAppDispatch();

  const handleClick = (id: number): void => {
    dispatch(pickPlace({ id }));
  };
  return (
    <>
      <CardDiv>
        <CardImg src={src} alt='aaaa' />
        <Textdiv>
          <RecommandTitle>{title}</RecommandTitle>
          <Button onClick={() => handleClick(id)}>+</Button>
        </Textdiv>
      </CardDiv>
    </>
  );
};

const CardDiv = styled.section`
  ${tw`
flex flex-col m-4 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
`}
  box-shadow: 00 10px 30px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;
const CardImg = styled.img`
  ${tw`object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg`}
`;
const Textdiv = styled.div`
  ${tw`flex flex-col justify-between p-4 leading-normal`}
`;

const RecommandTitle = styled.h5`
  ${tw`mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white`}
`;

const Button = styled.button`
  ${tw`bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl font-bold`}
  position: relative;
  bottom: 0;
  right: 0;
`;
