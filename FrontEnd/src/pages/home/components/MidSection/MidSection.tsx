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
        imageSrc={'/tripImages/daejeon.jpg'}
        description={
          '우리나라 제2의 수도 부산광역시. 부산 대표 관광지로 손꼽히는 해운대는 밤에는 마린시티의 야경이 더해져 더욱 화려한 해변이 된다. 감천문화마을은 사진 찍기에 좋으며, 매해 가을마다 개최되는 아시아 최대 규모의 영화제인 부산국제영화제와 함께 부산의 구석구석을 즐겨보는 것도 좋다. 전통시장 투어가 있을 만큼 먹거리가 가득한 부산의 맛기행은 필수!'
        }
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
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
