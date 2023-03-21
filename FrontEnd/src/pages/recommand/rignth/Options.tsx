import styled from 'styled-components';
import tw from 'twin.macro';
import axios from 'axios';
import { RecommandCard } from './RecommandCard';
import { useEffect, useState } from 'react';
interface Recommand {
  title: string;
  lat: string;
  lng: string;
}
const RecommandList = () => {
  const [recommandList, setRecommandList] = useState<Array<Recommand>>([]);
  useEffect(() => {
    const fetchRecommandList = async () => {
      try {
        const res = await axios.get('http://localhost:3003/markers');
        setRecommandList(res.data.slice());
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecommandList();
  }, []);

  return (
    <>
      {recommandList.length > 0 && (
        <div>
          {recommandList.map((recommand: Recommand) => (
            <RecommandCard key={recommand.lat} title={recommand.title} src={recommand.lat} />
          ))}
        </div>
      )}
    </>
  );
};

export const Options = () => {
  return (
    <>
      <OptionBox>
        <OptionTitle>추천 장소</OptionTitle>
        <RecommandList />
      </OptionBox>
    </>
  );
};

const OptionBox = styled.section`
  ${tw`flex grow flex-col justify-center items-center`}
`;
const OptionTitle = styled.span`
  ${tw`text-xl font-bold`}
`;
