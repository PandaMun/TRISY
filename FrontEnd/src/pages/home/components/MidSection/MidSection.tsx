import styled from 'styled-components';
import tw from 'twin.macro';
import { MidCarousel } from './MidCarousel';
import { Modal } from './Modal';

export default function MidSection() {
  return (
    <>
      <S.Section>
        <div className='text-center mt-10 font-nexon text-3xl font-bold'>인기 여행지</div>
        <MidCarousel />
      </S.Section>
      <Modal />
    </>
  );
}

const S = {
  Section: styled.div`
    ${tw`mx-auto`}
    width: 70vw;
  `,
};
