import styled from 'styled-components';
import Slider from 'react-slick';
import Next from '~/../public/icons/right-arrow.svg';

/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */

export const SlickSlider = (props: { children: any }) => {
  // eslint-disable-next-line react/prop-types
  const { children } = props;

  const settings = {
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    dots: false,
    nextArrow: (
      <Div>
        <img src={Next} alt='Next' />
        <Next />
      </Div>
    ),
    prevArrow: (
      <DivPre>
        <Next />
      </DivPre>
    ),
  };
  return (
    <>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </>
  );
};
const StyledSlider = styled(Slider)`
  height: 260px;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-slide div {
    //슬라이더  컨텐츠
    cursor: pointer;
  }
`;
const Div = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 16px;
  z-index: 99;
  text-align: right;
  line-height: 30px;
`;
const DivPre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 16px;
  z-index: 99;
  text-align: left;
  line-height: 30px;
`;
