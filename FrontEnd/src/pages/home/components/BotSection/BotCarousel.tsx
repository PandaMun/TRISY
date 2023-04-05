import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import tw from 'twin.macro';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Spinner } from '~/components/Shared/Spinner';
import { getRandomBoardListApi } from '~/api/boardApi';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const BotCarousel = () => {
  const navigate = useNavigate();
  const { data: random, isLoading: randomLoading } = useQuery(['random'], getRandomBoardListApi, {
    retry: 5,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: false,
  });
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1200, // 화면의 넓이가 600px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1700, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2200, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <S.Next>
        <svg
          fill='none'
          stroke='white'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5'></path>
        </svg>
        {/* <GrFormNext className='text-6xl absolute left-12 top-6 color-white' /> */}
      </S.Next>
    ),
    prevArrow: (
      <S.Prev>
        <svg
          fill='none'
          stroke='white'
          strokeWidth='1.5'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
          aria-hidden='true'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5'></path>
        </svg>
      </S.Prev>
    ),
  };
  const formatDate = (date: string) => {
    const newdate = new Date(date as string);
    const formattedDate = newdate.toISOString().slice(0, 10);
    return formattedDate;
  };
  if (randomLoading) return <Spinner />;
  return (
    <>
      <S.StyledSlider {...settings}>
        {random?.map((el, idx) => (
          <S.Card
            key={idx}
            onClick={() => {
              navigate(
                `/post/${formatDate(el.createdTime ? el.createdTime : '2023-04-05')}/${el.id}`,
                { state: { url: el.thumbnailUrl !== null ? el.thumbnailUrl : 'noImg' } },
              );
            }}
          >
            <S.CardBox>
              <S.ImageBox>
                <img
                  src={el.thumbnailUrl}
                  alt=''
                  className='transition-all duration-300 hover:scale-125 w-full h-full'
                />
              </S.ImageBox>
              <div className='absolute bottom-0 top-0 text-white font-nexon font-bold text-xl'>
                <div>{el.title}</div>
                <p className='text-sm'>by {el.nickname}</p>
              </div>
            </S.CardBox>
          </S.Card>
        ))}
      </S.StyledSlider>
    </>
  );
};

const S = {
  Card: styled.div`
    ${tw`relative flex items-center justify-center w-[300px] h-[400px] hover:cursor-pointer mb-10 mt-3`}
  `,
  CardBox: styled.div`
    ${tw`w-full h-full relative px-3`}
  `,
  ImageBox: styled.div`
    ${tw`overflow-hidden w-full h-full`}
    img {
      ${tw`transition-all duration-300 hover:scale-125`}
    }
  `,
  ContentBox: styled.div`
    ${tw`m-5`}
  `,
  StyledSlider: styled(Slider)`
    .slick-prev::before,
    .slick-next::before {
      opacity: 0;
      display: none;
    }
  `,
  Next: styled.div`
    ${tw`w-20 h-[800px] scale-110 z-10 pr-5`}
  `,
  Prev: styled.div`
    ${tw`w-20 h-[800px] scale-110 z-10 pl-5`}
  `,
};
