import React, { useState } from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  birthday: string; // Use string instead of Date to avoid validation errors
};

const schema = yup
  .object({
    name: yup.string().required('이름을 입력해주세요.'),
    email: yup.string().email('이메일 형식으로 입력해주세요.').required('이메일을 입력해주세요.'),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요.')
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z]).{8,}$/,
        '비밀번호는 최소 8자 이상, 1개 이상의 숫자, 특수문자, 소문자를 포함해야 합니다.',
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
    phone: yup
      .string()
      .matches(/^[0-9-]+$/, '유효한 전화번호를 입력해주세요.')
      .required('전화번호를 입력해주세요.'),
    birthday: yup.date().required('생일을 입력해주세요.'),
  })
  .required();

export const SignUpForm = () => {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhone(
      value.replace(/(\d{3})(\d{0,4})(\d{0,4})/, (match, p1, p2, p3) =>
        p2 ? `${p1}-${p2}${p3 ? `-${p3}` : ''}` : `${p1}${p3 ? `-${p3}` : ''}`,
      ),
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSignUp: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <S.SignUpForm onSubmit={handleSubmit(onSignUp)}>
      <S.NameLabel>
        <span>이름</span>
        <S.Input type='text' placeholder='이름을 입력해주세요' {...register('name')}></S.Input>
        <S.ErrorMsg>{errors.name?.message}</S.ErrorMsg>
      </S.NameLabel>
      <S.EmailLabel>
        <span>이메일</span>
        <S.Input type='email' placeholder='이메일을 입력해주세요' {...register('email')}></S.Input>
        <S.ErrorMsg>{errors.email?.message}</S.ErrorMsg>
      </S.EmailLabel>
      <S.PhoneLabel>
        <span>전화번호</span>
        <S.Input
          type='text'
          placeholder='전화번호를 입력해주세요'
          {...register('phone')}
          value={phone}
          maxLength={13}
          onChange={handlePhoneChange}
        ></S.Input>
        <S.ErrorMsg>{errors.phone?.message}</S.ErrorMsg>
      </S.PhoneLabel>
      <S.BirthdayLabel>
        <span>생년월일</span>
        <S.Input type='date' {...register('birthday')}></S.Input>
        <S.ErrorMsg>{errors.birthday?.message}</S.ErrorMsg>
      </S.BirthdayLabel>
      <S.PasswordLabel>
        <span>비밀번호</span>
        <S.Input
          type='password'
          placeholder='비밀번호를 입력해주세요'
          autoComplete='off'
          {...register('password')}
        ></S.Input>
        <S.ErrorMsg>{errors.password?.message}</S.ErrorMsg>
      </S.PasswordLabel>
      <S.ConfirmPasswordLabel>
        <span>비밀번호 확인</span>
        <S.Input
          type='password'
          placeholder='비밀번호 확인을 입력해주세요'
          autoComplete='off'
          {...register('confirmPassword')}
        ></S.Input>
        <S.ErrorMsg>{errors.confirmPassword?.message}</S.ErrorMsg>
      </S.ConfirmPasswordLabel>
      <S.Button type='submit'>회원가입</S.Button>
    </S.SignUpForm>
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
    ${tw`block`}
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
