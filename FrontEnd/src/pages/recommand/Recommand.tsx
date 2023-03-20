import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './components/KakaoMap';
export const Recommand = () => {
  // const map = new kakao.maps.Map(container, options);

  return (
    <>
      <Temporarydiv />
      <MainContainer>
        <KakaoMap />
      </MainContainer>
    </>
  );
};

const Temporarydiv = styled.div`
  ${tw`w-screen h-32`}
`;
const Headtwo = styled.h2`
  text-decoration: underline;
  text-decoration-color: red;
`;

const MainContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;
