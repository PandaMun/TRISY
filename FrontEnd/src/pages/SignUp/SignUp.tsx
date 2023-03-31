import styled from 'styled-components';
import tw from 'twin.macro';
import { SignUpForm } from './components/SignUpForm';
import { SignUpHeader } from './components/SignUpHeader';

export const SignUp = () => {
  return (
    <S.Container>
      <SignUpHeader />
      <S.Box>
        <SignUpForm />
      </S.Box>
    </S.Container>
  );
};

const S = {
  Container: styled.div`
    ${tw`w-full min-h-screen px-6 mx-auto`}
  `,
  Box: styled.div`
    ${tw`max-w-md mx-auto space-y-6`}
  `,
};
