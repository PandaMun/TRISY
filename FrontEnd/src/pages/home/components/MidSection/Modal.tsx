import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppSelector } from '~/app/hooks';
import { ModalState, setDate, setModalClose, setModalRange } from './ModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '~/app/hooks';
import { useNavigate } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { ko } from 'date-fns/locale';
import { useAuth } from '~/hooks/useAuth';
import { useState } from 'react';
export const Modal = () => {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      range: 0,
      key: 'selection',
    },
  ]);
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const navigate = useNavigate();
  const ModalSlice = useAppSelector(ModalState);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(setModalClose());
  };
  const gotoMap = () => {
    const range = (state[0].endDate - state[0].startDate) / (1000 * 60 * 60 * 24) + 1;
    if (user) {
      const startDate = state[0].startDate.toString();
      const endDate = state[0].endDate.toString();
      onClose();
      navigate(`/map/${ModalSlice.spotTitle}/${user.nickname}`);
      dispatch(setModalRange({ range }));
      dispatch(setDate({ startDate, endDate }));
    } else {
      onClose();
      navigate(`/login`);
    }
  };
  return (
    <>
      {ModalSlice.isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>
              <AiOutlineClose />
            </CloseButton>
            <InfoDiv>
              <ModalImage src={ModalSlice.imgUrl} alt='Modal Image' />
              <ModalHeader>{ModalSlice.spotTitle}</ModalHeader>
              <ModalDescription>{ModalSlice.body}</ModalDescription>
            </InfoDiv>
            <DateDiv>
              <DateRange
                editableDateInputs={true}
                onChange={async (item) => {
                  setState([item.selection]);
                }}
                moveRangeOnFirstSelection={false}
                ranges={state}
                locale={ko}
              />
              <ModalButtons onClick={gotoMap}>
                <button type='button'>여행 일정 만들기</button>
              </ModalButtons>
            </DateDiv>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  ${tw`fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-70 bg-gray-700 flex items-center justify-center`}
  display: flex;
  align-items: center;
`;
const ModalWrapper = styled.div`
  ${tw`bg-white w-[20vw] min-w-[360px] rounded-xl shadow-md relative flex flex-row`}
  top: 25%;
  transform: translate(-50%, -50%);
`;
const ModalHeader = styled.div`
  ${tw`flex justify-between items-center text-lg font-semibold mb-3 ml-2`}
`;
const ModalImage = styled.img`
  ${tw`w-full mb-3 `}
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
`;

const ModalDescription = styled.p`
  ${tw` text-sm mb-3 ml-5 mr-5`}
`;

const ModalButtons = styled.div`
  ${tw`hover:cursor-pointer  text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2 absolute right-3 bottom-3`}
`;

const CloseButton = styled.button`
  ${tw`text-3xl font-bold p-1 rounded-full hover:opacity-100 absolute top-3 right-3 opacity-80`}
  color: rgba(255, 255, 255, 0.8);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
const DateDiv = styled.div`
  ${tw`bg-white w-[20vw] min-w-[360px] shadow-md relative flex justify-center items-center`}
`;
const InfoDiv = styled.div`
  ${tw`bg-white w-[25vw] min-w-[360px] shadow-md relative`}
`;
