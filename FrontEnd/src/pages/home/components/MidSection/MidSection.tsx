import styled from 'styled-components';
import tw from 'twin.macro';
import { MidCarousel } from './MidCarousel';
import { Modal } from './Modal';
export default function MidSection() {
  return (
    <>
      <S.InfoSection>
        <S.LeftSection>
          <div className='text-center font-nexon text-3xl font-bold'>TRISY란?</div>
          <div className='text-center font-nexon text-base font-bold mt-2'>
            여행 일자, 지역 선택과 간단한 설문조사만으로
            <br /> 여행지를 추천해주는 쉽고 간편한 여행 일정 플래너
          </div>
        </S.LeftSection>

        <S.RightSection>
          <div>
            <h1>STEP 1</h1>
            <h2>여행지선택</h2>
          </div>
          <div>
            <h1>STEP 2</h1>
            <h2>장소선택</h2>
          </div>
          <div>
            <h1>STEP 3</h1>
            <h2>일정생성</h2>
          </div>
        </S.RightSection>
      </S.InfoSection>
      <S.Section>
        <div className='text-center mt-10 font-nexon text-xl font-bold'>인기 여행지</div>
        <div className='text-center font-nexon text-base font-bold text-slate-400'>
          POULAR DESTINATIONS
        </div>
        <MidCarousel />
      </S.Section>
      <Modal />
    </>
  );
}

const S = {
  InfoSection: styled.div`
    ${tw`grid grid-cols-3 h-64`}
  `,
  LeftSection: styled.div`
    ${tw`col-span-1 bg-slate-200 dark:bg-slate-700 flex flex-col justify-center items-center`}
  `,
  RightSection: styled.div`
    ${tw`col-span-2 grid grid-cols-3 font-nexon text-center`}
    div {
      ${tw`col-span-1 m-auto`}
    }
    h1 {
      ${tw`text-2xl font-bold`}
    }
    h2 {
      ${tw`text-base mt-2 tracking-wider font-bold`}
      letter-spacing: 0.2rem;
    }
  `,
  Section: styled.div`
    ${tw`mx-auto w-3/4 pt-5`}
  `,
};
