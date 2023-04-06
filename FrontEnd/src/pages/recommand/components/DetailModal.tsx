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
  const NaverSearch = () => {
    window.open(`https://search.naver.com/search.naver?query=${DModalSlice.title}`);
  };
  const InstaSearch = () => {
    window.open(`https://www.instagram.com/explore/tags/${DModalSlice.title}`);
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
          <IconDiv>
            <Icon
              tabIndex={0}
              role='button'
              onClick={() => NaverSearch()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  console.log('Pressed Enter or Space');
                }
              }}
            >
              <SearchIcon src='naver.png' alt='naver' />
            </Icon>
            <Icon
              tabIndex={0}
              role='button'
              onClick={() => InstaSearch()}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  console.log('Pressed Enter or Space');
                }
              }}
            >
              <SearchIcon src='insta.png' alt='insta' />
            </Icon>
          </IconDiv>
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

const CloseButton = styled.button`
  ${tw`text-3xl font-bold p-1 rounded-full hover:opacity-100 absolute top-3 right-3 opacity-80`}
  color: rgba(255, 255, 255, 0.8);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
const InfoDiv = styled.div`
  ${tw`bg-white w-[25vw] min-w-[360px] shadow-md relative`}
`;
const IconDiv = styled.div`
  ${tw`flex flex-row justify-end bg-white w-[25vw] min-w-[360px] shadow-md relative`}
`;
const Icon = styled.div`
  ${tw`mx-2 mb-1`}
`;

const SearchIcon = styled.img`
  ${tw`w-[30px]`}
`;
