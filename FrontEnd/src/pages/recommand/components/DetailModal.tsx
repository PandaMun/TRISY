import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppSelector } from '~/app/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '~/app/hooks';
import { detail, setDModalClose } from '../DetailSlice';
export const DetailModal = () => {
  const DModalSlice = useAppSelector(detail);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(setDModalClose());
  };
  return (
    <>
      <ModalOverlay onClick={onClose}>
        <CloseButton onClick={onClose}>
          <AiOutlineClose />
        </CloseButton>
        <InfoDiv>
          <ModalImage src={DModalSlice.imgUrl} alt='Modal Image' />
          <ModalHeader>{DModalSlice.title}</ModalHeader>
          <ModalDescription>{DModalSlice.desc}</ModalDescription>
        </InfoDiv>
      </ModalOverlay>
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
