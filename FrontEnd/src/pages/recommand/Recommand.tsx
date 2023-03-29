import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './centermap/KakaoMap';
import { Options } from './right/Options';
import { PickList } from './left/PickList';
import { useState, useEffect } from 'react';
import { ExitModal } from './components/ExitModal';
export const Recommand = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && <ExitModal />}
      <MainContainer>
        <PickList />
        <KakaoMap />
        <Options />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  ${tw`flex justify-between items-center`}
`;
