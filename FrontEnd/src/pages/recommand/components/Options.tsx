import styled from 'styled-components';
import tw from 'twin.macro';

export const Options = () => {
  <>
    <OptionBox>
      <OptionTitle>추천 장소</OptionTitle>
    </OptionBox>
  </>;
};
const OptionBox = styled.div`
  ${tw`flex flex-col justify-center items-center`}
`;
const OptionTitle = styled.span`
  ${tw`text-xl font-bold`}
`;
