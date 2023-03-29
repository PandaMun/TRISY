import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { MyInfo } from './MyInfo';
import { MyReview } from './MyReview';
import { MyTrip } from './MyTrip';

export const MyPage = () => {
  const tabList: {
    [key: number]: JSX.Element;
  } = {
    0: <MyTrip />,
    1: <MyReview />,
    2: <MyInfo />,
  };
  const [activeTab, setActiveTab] = useState(0);
  const changeTab = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
  return (
    <S.Body>
      <S.TabBox>
        <ul>
          <S.TabList
            className={`${activeTab === 0 ? 'mypage-active-tab' : 'mypage-inactive-tab'}`}
            onClick={() => changeTab(0)}
          >
            여행기록
          </S.TabList>
          <S.TabList
            className={`${activeTab === 1 ? 'mypage-active-tab' : 'mypage-inactive-tab'}`}
            onClick={() => changeTab(1)}
          >
            여행후기
          </S.TabList>
          <S.TabList
            className={`${activeTab === 2 ? 'mypage-active-tab' : 'mypage-inactive-tab'}`}
            onClick={() => changeTab(2)}
          >
            내 정보
          </S.TabList>
        </ul>
      </S.TabBox>
      <S.ContentBox>{tabList[activeTab]}</S.ContentBox>
    </S.Body>
  );
};

const S = {
  Body: styled.div`
    ${tw`flex min-h-screen`}
  `,
  TabBox: styled.div`
    ${tw`ml-60 mt-20`}
  `,
  TabList: styled.li`
    ${tw`hover:cursor-pointer  ml-5 mb-5 mt-5 m-5 p-3 w-48 text-center rounded-xl `}
  `,
  ContentBox: styled.div`
    ${tw`mr-96 w-full m-5 `}
  `,
};
