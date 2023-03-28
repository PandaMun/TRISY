import ProgressBar from '@ramonak/react-progress-bar';
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { FadeInUp } from '~/gsap/FadeinUp';
import gsap from 'gsap';
import './components/progressbarStyle.scss';
import { QuestionList } from './components/QList';
export const Survey = () => {
  const containerRef = useRef(null);
  const [step, setStep] = useState(20);
  const handleClick = () => {
    gsap.to(containerRef.current, {
      duration: 1,
      y: -100,
      opacity: 0,
    });
    setStep(step + 10);
  };
  return (
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
        <Question>{QuestionList[step / 20]}</Question>
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
  );
};
const MainDiv = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SubDiv = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Question = styled.h1`
  font-weight: bold;
  font-size: 50px;
`;
