import Slider from 'react-slick';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ImgInfo } from './ImgInfo';
import { useDispatch } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { setModalOpen } from './ModalSlice';
export const MidCarousel = () => {
  const dispatch = useDispatch();
  const modalOpen = () => {
    dispatch(setModalOpen());
  };
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
        <GrFormNext className='text-6xl absolute left-12 top-6' />
      </S.Next>
    ),
    prevArrow: (
      <S.Prev>
        <GrFormPrevious className='text-6xl absolute right-12 top-6' />
      </S.Prev>
    ),
  };
  return (
    <>
      <S.StyledSlider {...settings}>
        {ImgInfo.map((el, idx) => (
          <S.Card key={idx} onClick={modalOpen}>
            <S.CardBox>
              <S.ImageBox>
                <img
                  src={el.imageUrl}
                  alt=''
                  className='transition-all duration-300 hover:scale-125'
                />
              </S.ImageBox>
              <S.SectionTitle>
                <div>{el.title}</div>
              </S.SectionTitle>
              <S.SectionKoTitle>
                <div>{el.desc}</div>
              </S.SectionKoTitle>
            </S.CardBox>
          </S.Card>
        ))}
      </S.StyledSlider>
    </>
  );
};

const S = {
  Section: styled.section`
    ${tw`min-h-screen mx-auto max-w-7xl`}
  `,
  SectionTitle: styled.div`
    ${tw`text-xl font-medium ml-3 mt-3`}
  `,
  SectionKoTitle: styled.div`
    ${tw`text-2xl font-bold m-3`}
  `,
  SectionContent: styled.div`
    ${tw`flex justify-around`}
  `,
  Card: styled.div`
    ${tw`relative flex items-center justify-center max-w-[250px] max-h-[500px] shadow-xl hover:cursor-pointer mb-10 mt-10`}
  `,
  CardBox: styled.div`
    ${tw`w-full h-full`}
  `,
  ImageBox: styled.div`
    ${tw`overflow-hidden`}
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
    ${tw`w-20 h-20 text-black`}
  `,
  Prev: styled.div`
    ${tw`w-20 h-20 text-black`}
  `,
};
