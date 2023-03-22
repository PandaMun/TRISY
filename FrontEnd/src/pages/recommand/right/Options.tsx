import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';
import { RecommandCard } from './RecommandCard';
import { useEffect, useState } from 'react';
import { useRecommand } from '../querys/RecommandList';
interface Recommand {
  title: string;
  lat: string;
  lng: string;
}

export const Options = () => {
  const { recommandList } = useRecommand();
  if (recommandList.data) {
    return (
      <>
        <OptionBox>
          <OptionTitle>추천 장소</OptionTitle>
          {recommandList.data.length > 0 && (
            <div>
              {recommandList.data.map((recommand: Recommand) => (
                <RecommandCard key={recommand.lat} title={recommand.title} src={recommand.lat} />
              ))}
            </div>
          )}
        </OptionBox>
      </>
    );
  }
  return <h1>4040</h1>;
};

const OptionBox = styled.section`
  ${tw`flex grow flex-col justify-center items-center`}
`;
const OptionTitle = styled.span`
  ${tw`text-xl font-bold`}
`;
