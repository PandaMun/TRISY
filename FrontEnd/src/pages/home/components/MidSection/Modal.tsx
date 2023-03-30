import styled from 'styled-components';
import tw from 'twin.macro';
import { useAppSelector } from '~/app/hooks';
import { ModalState } from './ModalSlice';
interface Props {
  imageSrc: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal = ({ imageSrc, description, onClose, onConfirm }: Props) => {
  const isOpen = useAppSelector(ModalState);
  return (
    <>
      {isOpen.isOpen && (
        <ModalOverlay onClick={onClose}>
          <ModalWrapper onClick={(e) => e.stopPropagation()}>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalImage src={imageSrc} alt='Modal Image' />
            <ModalDescription>{description}</ModalDescription>
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
  ${tw`bg-white w-96 p-5 rounded-lg shadow-md`}
`;
const ModalHeader = styled.div`
  ${tw` text-lg font-semibold mb-3`}
`;
const ModalImage = styled.img`
  ${tw`w-full mb-3`}
`;
const ModalDescription = styled.p`
  ${tw` text-sm mb-3`}
`;
const ModalButtons = styled.div`
  ${tw` flex justify-end gap-2`}
`;
