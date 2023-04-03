import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './centermap/KakaoMap';
import { Options } from './right/Options';
import { PickList } from './left/PickList';
import { useState } from 'react';
import { ExitModal } from './components/ExitModal';
import { SurveyModal } from './components/SurveyModal';
export const Recommand = () => {
  const [showModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(true);

  return (
    <>
      {showModal && <ExitModal />}
      {showSurveyModal && <SurveyModal />}
      <MainContainer>
        <KakaoMap />
        <PickList />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  ${tw`flex justify-between items-center`}
`;
