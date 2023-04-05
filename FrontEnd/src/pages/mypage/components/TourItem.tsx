import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { delTourApi, getTourByIdApi } from '~/api/boardApi';
import { Button } from '~/components/Shared/Button';
import { useAuth } from '~/hooks/useAuth';
import { tourDetail } from '~/types/sharedTypes';

interface TourItemProps {
  tourId: string;
}

export const TourItem = ({ tourId }: TourItemProps) => {
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const { data: tour } = useQuery<tourDetail>(['tour', tourId], () => getTourByIdApi(tourId));
  const navigate = useNavigate();

  const id = tour ? tour.id : '';

  const handleReview = () => {
    navigate(`/createPost/${id}`);
  };

  const handlePlan = () => {
    console.log('plan');
  };

  const handleLink = () => {
    console.log('link');
  };

  const handleDelete = async () => {
    if (window.confirm(`정말로 삭제하시겠습니까?`)) {
      const res = await delTourApi(id);
      console.log(res);
    }
  };

  return (
    <S.Box>
      <S.ImageBox>
        <img src='./tripImages/busan.jpg' alt='' />
      </S.ImageBox>
      <S.TourSpotBox>
        <h2>BUSAN</h2>
        <h3>대한민국 부산</h3>
        <h4>{user?.email}</h4>
        <div>B</div>
      </S.TourSpotBox>
      <S.DetailBox>
        <S.DetailGridBox>
          <section>
            <div>
              <span>여행이름</span>
              {tour?.tourName}
            </div>
            <div>
              <span>여행시작</span>
              {tour?.startDate}
            </div>
          </section>
        </S.DetailGridBox>
        <S.DetailGridBox>
          <section>
            <div>
              <span>여행스팟</span>
              {tour?.tourDetailsResponseList.length}
            </div>
            <div>
              <span>여행종료</span>
              {tour?.endDate}
            </div>
          </section>
        </S.DetailGridBox>
        <S.DetailButtonBox>
          <Button
            type='button'
            className='mypage-detail-button'
            text='리뷰 작성'
            onClick={handleReview}
          />
          <Button
            type='button'
            className='mypage-detail-button'
            text='일정 계획'
            onClick={handlePlan}
          />
          <Button
            type='button'
            className='mypage-detail-button'
            text='일정 공유'
            onClick={handleLink}
          />
          <Button
            type='button'
            className='mypage-detail-button'
            text='일정 삭제'
            onClick={handleDelete}
          />
        </S.DetailButtonBox>
      </S.DetailBox>
    </S.Box>
  );
};

const S = {
  Box: styled.div`
    ${tw`p-3 shadow-lg my-6 grid grid-cols-5 shadow-slate-500 min-w-[650px] w-full dark:border-2 dark:shadow-slate-700`}
  `,
  ImageBox: styled.div`
    ${tw`col-span-1 w-full h-full rounded-xl`}
    img {
      ${tw`w-full h-full rounded-xl`}
    }
  `,
  TourSpotBox: styled.div`
    ${tw`col-span-1 text-center flex flex-col justify-center items-center`}
    h2 {
      ${tw`text-2xl font-nexon font-bold`}
    }
    h3 {
      ${tw`text-sm font-nexon`}
    }
    h4 {
      ${tw`text-xs font-nexon mt-2`}
    }
    div {
      ${tw`text-xl font-nexon mt-10 border-2 py-2 px-4 rounded-full font-bold text-white bg-slate-500`}
    }
  `,
  DetailBox: styled.div`
    ${tw`col-span-3 grid grid-cols-2`}
  `,
  DetailGridBox: styled.div`
    ${tw`font-nexon font-bold text-lg space-y-5 flex flex-col justify-center mt-10`}
    span {
      ${tw`text-red-300 font-normal mr-4 text-base`}
    }
    section {
      ${tw`pb-10 space-y-5`}
    }
  `,
  DetailButtonBox: styled.div`
    ${tw`flex justify-start space-x-3 col-span-full mb-10`}
  `,
};
