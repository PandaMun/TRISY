import ProgressBar from '@ramonak/react-progress-bar';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FadeInUp } from '~/gsap/FadeinUp';
import gsap from 'gsap';
import './components/progressbarStyle.scss';
import { QuestionList, COLORS } from './components/QList';
export const Survey = () => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(20);
  const [color, setBgColor] = useState(0);
  const handleClick = () => {
    console.log(Math.round(step / 20));
    gsap.to(containerRef.current, {
      duration: 0.5,
      y: '-100%',
      opacity: 0,
      ease: 'power2.inOut',
      onComplete: () => {
        setStep(step + 10);
        gsap.to(containerRef.current, {
          duration: 0.5,
          y: '0%',
          opacity: 1,
          ease: 'power2.inOut',
        });
      },
    });
    setBgColor(color + 1);
  };
  return (
    <>
      <Container color={COLORS[color]}>
        <MainDiv>
          <ProgressBar
            completed={step}
            borderRadius='100px'
            barContainerClassName='container'
            height='50px'
            labelAlignment='center'
            className='m-10 min-w-fit'
          />
          <SubDiv ref={containerRef}>
            <Question>{QuestionList[Math.round(step / 20)]}</Question>
            <div>
              <button
                onClick={() => {
                  handleClick();
                }}
                className='m-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              >
                산
              </button>
              <button
                onClick={() => {
                  setStep(step + 10);
                  handleClick();
                }}
                className='m-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              >
                바다
              </button>
            </div>
          </SubDiv>
        </MainDiv>
      </Container>
    </>
  );
};
const MainDiv = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Question = styled.h1`
  font-weight: bold;
  font-size: 50px;
`;
const Container = styled.div`
  background-color: ${(props) => props.color};
  transition: background-color 0.8s ease-in-out;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
