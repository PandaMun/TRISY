import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppSelector } from '~/app/hooks';
import { ModalState, setModalClose } from './ModalSlice';
import { AiOutlineClose } from 'react-icons/ai';
import { useAppDispatch } from '~/app/hooks';
interface Props {
  onConfirm: () => void;
}

export const Modal = ({ onConfirm }: Props) => {
  const ModalSlice = useAppSelector(ModalState);
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(setModalClose());
  };
  return (
    <>
      {ModalSlice.isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>
              <AiOutlineClose />
            </CloseButton>
            <ModalImage src={ModalSlice.imgUrl} alt='Modal Image' />
            <ModalHeader>{ModalSlice.spotTitle}</ModalHeader>
            <ModalDescription>{ModalSlice.body}</ModalDescription>
            <ModalButtons>
              <button type='button' onClick={onClose}>
                Cancel
              </button>
              <button type='button' onClick={onConfirm}>
                Confirm
              </button>
            </ModalButtons>
          </ModalWrapper>
        </ModalOverlay>
      )}
    </>
  );
};

const ModalOverlay = styled.div`
  ${tw`fixed top-0 left-0 w-screen h-screen z-50 bg-opacity-70 bg-gray-700 flex items-center justify-center`}
`;
const ModalWrapper = styled.div`
  ${tw`bg-white w-[20vw] min-w-[360px] rounded-lg shadow-md relative`}
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
  ${tw` flex justify-end gap-2`}
`;

const CloseButton = styled.button`
  ${tw`text-3xl font-bold p-1 rounded-full hover:opacity-100 absolute top-3 right-3 opacity-80`}
  color: rgba(255, 255, 255, 0.8);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;

const ModalContentDiv = styled.div`
  ${tw` m-5`}
`;
