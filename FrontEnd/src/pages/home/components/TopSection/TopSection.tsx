import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

export default function TopSection() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const videoRef = useRef(null);
  const viewportDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!videoRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.5, // 화면에 절반 이상 나타날 때 로딩 시작
      },
    );
    observer.observe(videoRef.current);
  }, []);
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
        <div ref={videoRef} className='w-full h-full'>
          {!shouldLoad && (
            // <div></div>
            <div className='h-full border-2 p-3'>
              <img src='./mainVideo/bg.png' alt='main' className='w-full h-full' />
            </div>
          )}
          {shouldLoad && (
            <video muted autoPlay loop className='object-cover w-full h-full'>
              <source src='./mainVideo/main.mp4' type='video/mp4'></source>
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
    video {
      ${tw`object-cover w-full h-full`}
    }
  `,
};
