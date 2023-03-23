import styled from 'styled-components';
import tw from 'twin.macro';
import { RecommandCard } from '../components/RecommandCard';
import { selectRecommand, setPlace } from '../recommandSlice';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { useEffect } from 'react';
import axios from 'axios';
interface Recommand {
  id: number;
  title: string;
  lat: string;
  lng: string;
}

export const Options = () => {
  const dispatch = useAppDispatch();
  const currentState = useAppSelector(selectRecommand);
  useEffect(() => {
    axios.get('http://localhost:3003/markers').then((res) => {
      dispatch(setPlace({ place: res.data }));
    });
  }, []);
  const recommandList = currentState;
  if (recommandList.recommandList) {
    return (
      <>
        <OptionBox>
          <OptionTitle>추천 장소</OptionTitle>
          {recommandList.recommandList.length > 0 && (
            <div>
              {recommandList.recommandList.map((recommand: Recommand) => (
                <RecommandCard
                  key={recommand.id}
                  title={recommand.title}
                  src={recommand.lat}
                  id={recommand.id}
                />
              ))}
            </div>
          )}
        </OptionBox>
      </>
    );
  }
  return <h1>추천 없음</h1>;
};

const OptionBox = styled.section`
  ${tw`flex flex-col justify-center items-center`}
  min-width: 250px;
  width: 300px;
`;
const OptionTitle = styled.span`
  ${tw`text-xl font-bold`}
`;
