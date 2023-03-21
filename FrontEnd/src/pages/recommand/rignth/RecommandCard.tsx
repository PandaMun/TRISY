import styled from 'styled-components';
import tw from 'twin.macro';
interface Imgsrc {
  src: string;
  title: string;
}
export const RecommandCard = ({ title, src }: Imgsrc) => {
  return (
    <>
      <CardDiv>
        <CardImg src={src} alt='aaaa' />
        <Textdiv>
          <RecommandTitle>{title}</RecommandTitle>
        </Textdiv>
      </CardDiv>
    </>
  );
};

const CardDiv = styled.section`
  ${tw`
flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700
`}
`;
const CardImg = styled.img`
  ${tw`object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg`}
`;
const Textdiv = styled.div`
  ${tw`flex flex-col justify-between p-4 leading-normal`}
`;

const RecommandTitle = styled.h5`
  ${tw`mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white`}
`;
