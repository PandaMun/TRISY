import styled from 'styled-components';
import tw from 'twin.macro';
import { MidCarousel } from './MidCarousel';
import { Modal } from './Modal';

export default function MidSection() {
  return (
    <>
      <S.Section>
        <MidCarousel />
      </S.Section>
      <Modal
        onConfirm={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </>
  );
}

const S = {
  Section: styled.div`
    ${tw`min-h-screen mx-auto`}
    width: 70vw;
  `,
};
