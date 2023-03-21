import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './components/KakaoMap';
import { Options } from './components/Options';
export const Recommand = () => {
  // const map = new kakao.maps.Map(container, options);

  return (
    <>
      <Temporarydiv />
      <MainContainer>
        <Options />
        <KakaoMap />
        <Options />
      </MainContainer>
    </>
  );
};

const Temporarydiv = styled.div`
  ${tw`w-screen h-32`}
`;

const MainContainer = styled.div`
  ${tw`flex justify-center items-center`}
`;
