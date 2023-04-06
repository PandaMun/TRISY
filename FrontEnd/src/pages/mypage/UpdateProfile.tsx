import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useAuth } from '~/hooks/useAuth';
import { UpdateProfileForm } from './components/UpdateProfileForm';
import { updateProfileImgApi } from '~/api/userApi';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '~/components/Shared/Button';

export const UpdateProfile = () => {
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const client = useQueryClient();

  const handleBack = () => {
    window.history.back();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    const paylaod = {
      file: file,
    };
    const res = await updateProfileImgApi(paylaod as any);
    console.log(res);
    await client.invalidateQueries(['mypage']);
    await alert('프로필 사진이 변경되었습니다.');
  };
  return (
    <S.Box>
      <S.ProfileBox>
        <Button
          type='button'
          text='뒤로'
          className='absolute top-0 right-0 mypage-button'
          onClick={handleBack}
        />
        <S.ImgBox>
          <img src={user?.profileUrl ? user.profileUrl : './profile.png'} alt='img' />
        </S.ImgBox>
        <label htmlFor='file' className='mypage-button'>
          프로필 사진 변경
        </label>
        <input
          type='file'
          id='file'
          accept='.jpg, .png, .gif'
          onChange={handleFileChange}
          className='bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 hidden'
        />
        <S.NameBox>
          <div>{user?.name}</div>
          <p>님의 프로필</p>
        </S.NameBox>
      </S.ProfileBox>
      <S.InfoBox>
        <h4>기본정보</h4>
        <UpdateProfileForm />
      </S.InfoBox>
    </S.Box>
  );
};

const S = {
  Box: styled.div`
    ${tw`min-h-screen p-20 w-[700px] mx-auto`}
  `,
  ProfileBox: styled.div`
    ${tw`flex flex-col justify-center items-center space-y-3 relative`}
  `,
  ImgBox: styled.div`
    ${tw`w-32 h-32 rounded-full border-2`}
    img {
      ${tw`w-full h-full rounded-full`}
    }
  `,
  NameBox: styled.div`
    ${tw`text-2xl font-bold`}
    div {
      ${tw`text-center`}
    }
    p {
      ${tw`text-sm text-slate-400`}
    }
  `,
  InfoBox: styled.div`
    ${tw`space-y-3 mt-5`}
    h4 {
      ${tw`text-xl font-bold border-l-4 border-red-200 pl-3`}
    }
  `,
};
