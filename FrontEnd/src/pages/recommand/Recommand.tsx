import styled from 'styled-components';
import tw from 'twin.macro';
import { KakaoMap } from './components/KakaoMap';
export const Recommand = () => {
  // const map = new kakao.maps.Map(container, options);

  return (
    <>
      <Headtwo>Recommand</Headtwo>
      <KakaoMap></KakaoMap>
    </>
  );
};

const Headtwo = styled.h2`
  text-decoration: underline;
  text-decoration-color: red;
`;

const Mapdiv = styled.div`
  ${tw`max-w-[250px] max-h-[500px] shadow-xl hover:cursor-pointer`}
`;
