import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './centermap/KakaoMap';
import { Options } from './right/Options';
import { PickList } from './left/PickList';
export const Recommand = () => {
  // const map = new kakao.maps.Map(container, options);

  return (
    <>
      <Temporarydiv />
      <MainContainer>
        <PickList />
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
