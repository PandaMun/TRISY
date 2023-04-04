import React from 'react';
import { useAuth } from '~/hooks/useAuth';
import styled from 'styled-components';
import tw from 'twin.macro';
import { Button } from '~/components/Shared/Button';
import { useNavigate } from 'react-router-dom';

export const MyInfo = () => {
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const navigate = useNavigate();
  const handleProfile = () => {
    navigate('/updateProfile');
  };
  return (
    <S.Box>
      <S.ProfileBox>
        <S.ImgBox>
          <img src={user?.profileUrl ? user.profileUrl : './profile.png'} alt='img' />
        </S.ImgBox>
        <S.NameBox>{user?.name}</S.NameBox>
        <Button
          className='w-32 h-8 border-2 rounded-xl font-nexon font-bold border-red-200 hover:ring-2 hover:ring-red-200'
          onClick={handleProfile}
          text='프로필 수정'
        />
      </S.ProfileBox>
    </S.Box>
  );
};

const S = {
  Box: styled.div`
    ${tw`min-h-screen p-20`}
  `,
  ProfileBox: styled.div`
    ${tw`border-2 flex flex-col justify-center items-center space-y-3`}
  `,
  ImgBox: styled.div`
    ${tw`w-32 h-32 rounded-full border-2`}
    img {
      ${tw`w-full h-full rounded-full`}
    }
  `,
  NameBox: styled.div`
    ${tw`text-2xl font-bold`}
  `,
};
