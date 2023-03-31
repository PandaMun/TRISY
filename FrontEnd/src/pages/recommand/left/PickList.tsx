import styled from 'styled-components';
import tw from 'twin.macro';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { RecommandCard } from '../components/RecommandCard';
import { useAppSelector } from '~/app/hooks';
import { selectRecommand } from '../recommandSlice';
import { useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import { ko } from 'date-fns/locale';
interface Recommand {
  title: string;
  lat: string;
  lng: string;
  id: number;
}

export const PickList = () => {
  const currentState = useAppSelector(selectRecommand);
  const { id } = useParams<{ id: string }>();
  const { location } = useParams<{ location: string }>();
  const pickList = currentState.pickList;
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  if (pickList) {
    return (
      <>
        <OptionBox>
          <TopSection>
            <CityTitle>{location}</CityTitle>
            <CityTitle>2박 3일</CityTitle>
            <DateRange
              editableDateInputs={true}
              onChange={async (item) => {
                setState([item.selection]);
                console.log(state[0].endDate);
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
              locale={ko}
            />
          </TopSection>
          <button
            onClick={() => {
              console.log(state[0].startDate);
              console.log(state[0].endDate);
            }}
          >
            ssssssssssssssss
          </button>
          <MidSection>
            <OptionTitle>선택 목록</OptionTitle>
            {pickList.length > 0 && (
              <div>
                {pickList.map((pick: Recommand) => (
                  <RecommandCard key={pick.lat} title={pick.title} src={pick.lat} id={pick.id} />
                ))}
              </div>
            )}
          </MidSection>
        </OptionBox>
      </>
    );
  }
  return <h1>추천 없음</h1>;
};

const OptionBox = styled.section`
  ${tw`flex flex-col `}
  width: 300px;
  height: 80vh;
`;
const TopSection = styled.div`
  ${tw`flex flex-col justify-center items-center`}
  width: 300px;
`;
const MidSection = styled.div`
  ${tw`flex flex-col justify-center items-center`}
  flex-grow: 1;
`;
const OptionTitle = styled.div`
  ${tw`text-xl font-bold`}
`;

const CityTitle = styled.div`
  ${tw`font-bold text-3xl `}
`;
