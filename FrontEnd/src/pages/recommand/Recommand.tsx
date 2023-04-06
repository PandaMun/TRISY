import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './centermap/KakaoMap';
import { PickList } from './left/PickList';
import { ExitModal } from './components/ExitModal';
import { useAppSelector } from '~/app/hooks';
import { schedule } from './left/ScheduleSlice';
export const Recommand = () => {
  const showExitModal = useAppSelector(schedule);
  return (
    <>
      <MainContainer>
        {showExitModal.isOpen && <ExitModal />}
        <KakaoMap />
        <PickList />
      </MainContainer>
    </>
  );
};

const MainContainer = styled.div`
  ${tw`flex justify-between items-center`}
`;
