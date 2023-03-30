import React from 'react';
import { useAuth } from '~/hooks/useAuth';

export const MyInfo = () => {
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  console.log(user);
  return <div>MyInfo</div>;
};
