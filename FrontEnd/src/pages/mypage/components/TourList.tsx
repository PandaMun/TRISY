import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTourListApi } from '~/api/boardApi';
import { Spinner } from '~/components/Shared/Spinner';
import { ErrorPage } from '~/pages/Handle/ErrorPage';
import { tourList } from '~/types/sharedTypes';

export const TourList = () => {
  const { data: tours, isLoading, error } = useQuery<tourList[]>(['tours'], getTourListApi);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;
  return (
    <div>
      {tours?.length === 0 && <div>여행 기록이 없습니다.</div>}
      <div className='m-5 p-5'>
        {tours?.map((tour) => (
          <div key={tour.id} className='flex space-x-5 p-3 border m-3 hover:cursor-pointer'>
            <div>{tour.id}</div>
            <div>{tour.tourName}</div>
            <div>{tour.startDate}</div>
            <div>{tour.endDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
