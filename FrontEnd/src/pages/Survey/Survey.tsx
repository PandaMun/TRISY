import ProgressBar from '@ramonak/react-progress-bar';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import './components/progressbarStyle.scss';
import { QuestionList, AList, SubQlist, SubAlist, COLORS } from './components/QList';
import tw from 'twin.macro';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { SurveyResult, pick } from './SurveySlice';
import { surveyPushApi } from '~/api/boardApi';
import { useAuth } from '~/hooks/useAuth';
import { SurveyCarousel } from './components/SurveyCarousel';
import { Modal } from '../home/components/MidSection/Modal';
export const Survey = () => {
  const dispatch = useAppDispatch();
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const surveyResult = useAppSelector(SurveyResult);
  const containerRef = useRef(null);
  const loadingRef = useRef(null);
  const loadingRef2 = useRef(null);
  const carouselref = useRef(null);
  const [step, setStep] = useState(10);
  const [sub, setSub] = useState(0);
  const [color, setBgColor] = useState(0);
  const [visible, setVigible] = useState(true);
  const index = Math.min(Math.round(step / 10) - 1, QuestionList.length - 1);
  const handleClick = async (answer: { [key: string]: string | { SubQ: number } }) => {
    const tl = gsap.timeline({ paused: true });
    setBgColor(color + 1);
    gsap.to(containerRef.current, {
      duration: 0.5,
      y: '-100%',
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        const firstValue = Object.values(answer)[0];
        if (typeof firstValue === 'object' && 'SubQ' in firstValue) {
          setSub(firstValue.SubQ);
          if (step < 90) {
            gsap.to(containerRef.current, {
              duration: 0.5,
              y: '0%',
              opacity: 1,
              ease: 'power2.inOut',
            });
          }
        } else {
          setSub(0);
          dispatch(pick(firstValue));
          setStep(step + 10);
          if (step < 90) {
            gsap.to(containerRef.current, {
              duration: 0.5,
              y: '0%',
              opacity: 1,
              ease: 'power2.inOut',
            });
          } else {
            tl.from(loadingRef.current, {
              duration: 0.5,
              y: '-100%',
              opacity: 0,
              ease: 'power2.inOut',
            })
              .from(loadingRef2.current, {
                duration: 0.5,
                y: '-100%',
                opacity: 0,
                ease: 'power2.inOut',
              })
              .from(carouselref.current, {
                duration: 0.5,
                y: '-100%',
                opacity: 0,
                ease: 'power2.inOut',
              });
            tl.play();
            surveyPushApi({ survey: surveyResult.surveyPick });
            setVigible(false);
          }
        }
      },
    });
  };
  const Answer = (sub: { sub: number }) => {
    if (sub.sub < 1) {
      return (
        <>
          {AList[(step - 10) / 10].map((el: any, index: number) => (
            <Button
              key={index}
              style={{ width: '440px', height: '66px', margin: '10px' }}
              onClick={() => {
                handleClick(el);
              }}
            >
              {Object.keys(el).toString()}
            </Button>
          ))}
        </>
      );
    }
    return (
      <>
        {SubAlist[sub.sub - 1].map((el: any, index: number) => (
          <Button
            key={index}
            style={{ width: '440px', height: '66px' }}
            onClick={() => {
              handleClick(el);
            }}
          >
            {Object.keys(el).toString()}
          </Button>
        ))}
      </>
    );
  };
  return (
    <>
      <Container color={COLORS[color]}>
        <MainDiv>
          <Modal />
          <TopDiv>
            <Trisy>TRiSY</Trisy>
            <ProgressBar
              completed={step}
              borderRadius='100px'
              barContainerClassName='container'
              height='40px'
              labelAlignment='center'
              className='m-10 min-w-fit'
            />
          </TopDiv>
          <SubDiv ref={containerRef} visible={visible}>
            <Question>{sub > 0 ? SubQlist[sub - 1] : QuestionList[index]}</Question>
            <ADiv>{step < 100 && <Answer sub={sub} />}</ADiv>
          </SubDiv>
          <LoadingDiv ref={loadingRef} visible={visible}>
            <LoadingMessage ref={loadingRef}>
              {user?.nickname}님의 취향정보를 확인했습니다.
            </LoadingMessage>
            <LoadingMessage2 ref={loadingRef2}>어디로 떠나실 건가요?</LoadingMessage2>
            <CSection ref={carouselref}>
              <SurveyCarousel />
            </CSection>
          </LoadingDiv>
          <Footer>Trip Easy with TRiSY</Footer>
        </MainDiv>
      </Container>
    </>
  );
};
const Container = styled.div`
  background-color: ${(props) => props.color};
  transition: background-color 0.8s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  height
`;
const MainDiv = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 5vh 0;
  height: 80vh;
`;
const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubDiv = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 580px;
`;
const ADiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
`;
const LoadingDiv = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'none' : 'flex')};
  transition: display 0.8s ease-in-out;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Question = styled.div`
  ${tw`font-bold text-4xl mb-[100px] dark:text-black`}
`;

const Trisy = styled.div`
  ${tw`font-extrabold text-3xl dark:text-black `}
`;
const LoadingMessage = styled.div`
  ${tw`font-extrabold text-3xl mb-3`}
`;
const LoadingMessage2 = styled.div`
  ${tw`font-extrabold text-3xl `}
`;
const Footer = styled.div`
  ${tw`font-bold text-xl dark:text-black `}
`;
const Button = styled.button`
  ${tw`m-6 inline-block px-6 py-3 rounded-full bg-white text-black font-bold text-lg focus:outline-none transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg`}
`;

const CSection = styled.div`
  ${tw`mx-auto`}
  width: 70vw;
`;
