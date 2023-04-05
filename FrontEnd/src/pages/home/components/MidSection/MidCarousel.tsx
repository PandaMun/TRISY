import Slider from 'react-slick';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ImgInfo } from './ImgInfo';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { setLocation, setModalOpen } from './ModalSlice';
export const MidCarousel = () => {
  const dispatch = useDispatch();
  const modalOpen = (imgUrl: string, title: string, body: string, lat: number, long: number) => {
    dispatch(setModalOpen({ imgUrl, title, body }));
    dispatch(setLocation({ lat, long }));
  };
  const GRAY_COLOR = 'white';
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2200, // 화면의 넓이가 320px 이상일 때
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <S.Next>
        <svg
          fill='none'
          stroke={GRAY_COLOR}
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
          stroke={GRAY_COLOR}
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
  return (
    <>
      <S.StyledSlider {...settings}>
        {ImgInfo.map((el, idx) => (
          <S.Card
            key={idx}
            onClick={() => {
              modalOpen(el.imageUrl, el.desc, el.body, el.lat, el.long);
            }}
          >
            <S.CardBox>
              <S.ImageBox>
                <img
                  src={el.imageUrl}
                  alt=''
                  className='transition-all duration-300 hover:scale-125 w-full h-full'
                />
              </S.ImageBox>
              <div className='absolute bottom-0 text-white'>
                <S.SectionTitle>
                  <div>{el.title}</div>
                  <div>{el.desc}</div>
                </S.SectionTitle>
              </div>
            </S.CardBox>
          </S.Card>
        ))}
      </S.StyledSlider>
    </>
  );
};

const S = {
  SectionTitle: styled.div`
    ${tw`text-xl font-medium`}
  `,
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
    ${tw`w-20 h-10 transform scale-75 text-black z-10 pr-5`}
  `,
  Prev: styled.div`
    ${tw`w-20 h-10 text-black scale-75 dark:text-white z-10 pl-5`}
  `,
};
