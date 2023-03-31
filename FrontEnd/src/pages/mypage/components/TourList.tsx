import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTourListApi } from '~/api/boardApi';
import { Button } from '~/components/Shared/Button';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '~/pages/Handle/ErrorPage';
import { tourList } from '~/types/sharedTypes';

export const TourList = () => {
  const navigate = useNavigate();
  const { data: tours, isLoading, error } = useQuery<tourList[]>(['tours'], getTourListApi);

  const handleClick = (id: string) => {
    console.log('click');
    navigate(`/createPost/${id}`);
  };

  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;
  return (
    <div>
      {tours?.length === 0 && <div>여행 기록이 없습니다.</div>}
      <div className='m-5 p-5'>
        {tours?.map((tour) => (
          <div key={tour.id} className='flex space-x-5 p-3 border m-3 items-center'>
            <div>{tour.id}</div>
            <div>{tour.tourName}</div>
            <div>{tour.startDate}</div>
            <div>{tour.endDate}</div>
            <Button
              type='button'
              className='p-3 border-2'
              onClick={() => {
                handleClick(tour.id);
              }}
              text='여행 후기 작성'
            />
          </div>
        ))}
      </div>
    </div>
  );
};
