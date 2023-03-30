import { useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { kakaoLoginCheck } from '~/api/userApi';
import { Spinner } from '~/components/Shared/Spinner';

export const Kakao = () => {
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];
  const client = useQueryClient();
  // console.log(kakaoLoginCheck(KAKAO_CODE));
  const kakaoCheck = async () => {
    const res = await kakaoLoginCheck(KAKAO_CODE);
    console.log(res);
    if (res === 'success') {
      await client.invalidateQueries(['user']);
      setSuccess(true);
    } else {
      alert('로그인 실패');
    }
  };
  // kakaoLogin(KAKAO_CODE);
  kakaoCheck();
  // console.log(kakaoLogin(KAKAO_CODE));
  if (success) {
    return <Navigate to='/' />;
  }
  return (
    <div>
      <Spinner />
    </div>
  );
};
