import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
export default function TopSection() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setTimeout(() => {
            setShouldLoad(true);
          }, 2000);
          observer.disconnect();
        }
      },
      {
        threshold: 0.9, // 화면에 절반 이상 나타날 때 로딩 시작
      },
    );
    observer.observe(videoRef.current);
  }, []);

  const viewportDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <S.Section>
      <S.LeftSection>
        <S.SiteIntroduction>AI 여행 스케줄링 플래너</S.SiteIntroduction>
        <S.SiteName>TRISY</S.SiteName>
        <button type='button' onClick={viewportDown}>
          시작하기
        </button>
      </S.LeftSection>
      <S.RightSection>
        <div ref={videoRef} className='w-full h-full relative'>
          {!shouldLoad && (
            // <div></div>
            <div className='h-full w-full absolute top-0 left-0'>
              <img src='./mainVideo/mainbg.png' alt='main' className='w-full h-full' />
            </div>
          )}
          {shouldLoad && (
            <video muted autoPlay className='absolute top-0 left-0 object-fill w-full h-full'>
              <source src='./mainVideo/main2.mp4' type='video/mp4'></source>
            </video>
          )}
        </div>
      </S.RightSection>
    </S.Section>
  );
}

const S = {
  Section: styled.div`
    ${tw`grid min-h-screen grid-cols-3`}
  `,
  LeftSection: styled.div`
    ${tw`flex flex-col items-center justify-center col-span-1 space-y-10 max-xl:col-span-3 pb-[100px]`}
    button {
      ${tw`py-5 text-2xl font-bold text-white bg-red-400 rounded px-28`}
    }
  `,
  SiteIntroduction: styled.div`
    ${tw`text-2xl font-bold`}
  `,
  SiteName: styled.div`
    ${tw`font-extrabold text-7xl`}
  `,
  RightSection: styled.div`
    ${tw`col-span-2 max-xl:hidden`}
  `,
};
