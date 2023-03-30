import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getTourListApi } from '~/api/boardApi';
import { Spinner } from '~/components/Shared/Spinner';
import { useAuth } from '~/hooks/useAuth';
import { board } from '~/types/sharedTypes';
import { ErrorPage } from '../Handle/ErrorPage';

export const MyReview = () => {
  const { useMyPage } = useAuth();
  const { data: myInfo } = useMyPage;
  console.log(myInfo);
  const { data: tours, isLoading, error } = useQuery<board[]>(['tours'], getTourListApi);
  console.log(tours);
  if (isLoading) return <Spinner />;
  if (error) return <ErrorPage />;

  return <div>MyReview</div>;
};
