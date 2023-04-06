import React, { FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { updateMyPageApi } from '~/api/userApi';
import { useAuth } from '~/hooks/useAuth';

export const UpdateProfileForm = () => {
  const { useMyPage } = useAuth();
  const { data: user } = useMyPage;
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [birth, setBirth] = useState('');
  useEffect(() => {
    setName(user?.name);
    setNickname(user?.nickname);
    setPhone(user?.phone);
    setBirth(user?.birth);
  }, [user]);
  const onSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      birth,
      name,
      nickname,
      phone,
    };
    console.log(payload);
    if (window.confirm(`정말로 수정하시겠습니까?`)) {
      await updateMyPageApi(payload);
      await alert('정보가 수정되었습니다.');
    }
  };
  return (
    <div>
      <S.SignUpForm onSubmit={onSignUp}>
        <S.NameLabel>
          <span>이름</span>
          <S.Input type='text' value={name} onChange={(e) => setName(e.target.value)}></S.Input>
        </S.NameLabel>
        <S.NameLabel>
          <span>닉네임</span>
          <S.Input
            type='text'
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></S.Input>
        </S.NameLabel>
        <S.PhoneLabel>
          <span>전화번호</span>
          <S.Input
            type='text'
            value={phone}
            maxLength={11}
            onChange={(e) => setPhone(e.target.value)}
          ></S.Input>
        </S.PhoneLabel>
        <S.BirthdayLabel>
          <span>생년월일</span>
          <S.Input
            type='date'
            max='9999-12-31'
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          ></S.Input>
        </S.BirthdayLabel>
        <S.Button type='submit'>정보수정</S.Button>
      </S.SignUpForm>
    </div>
  );
};

const S = {
  SignUpForm: styled.form`
    ${tw`grid grid-cols-1 gap-6`}
  `,
  NameLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`text-neutral-800 dark:text-neutral-200`}
    }
  `,
  EmailLabel: styled.label`
    ${tw`block relative`}
    span {
      ${tw`text-neutral-800 dark:text-neutral-200`}
    }
  `,
  PhoneLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`text-neutral-800 dark:text-neutral-200`}
    }
  `,
  PasswordLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`flex items-center justify-between text-neutral-800 dark:text-neutral-200`}
    }
  `,
  BirthdayLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`text-neutral-800 dark:text-neutral-200`}
    }
  `,
  ConfirmPasswordLabel: styled.label`
    ${tw`block`}
    span {
      ${tw`flex items-center justify-between text-neutral-800 dark:text-neutral-200`}
    }
  `,
  Input: styled.input`
    ${tw`block w-full px-4 py-3 mt-1 text-sm bg-white border-2 border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 dark:border-neutral-700 dark:focus:ring-primary-600 dark:focus:ring-opacity-25 dark:bg-neutral-900 h-11 rounded-2xl`}
  `,
  ErrorMsg: styled.p`
    ${tw`mb-3 text-xs font-bold text-red-400`}
  `,
  Button: styled.button`
    ${tw`px-4 py-3 sm:px-6 disabled:bg-opacity-70 rounded-2xl bg-primary-600 hover:bg-primary-700 text-neutral-50`}
  `,
};
