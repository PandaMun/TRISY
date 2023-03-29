import styled from 'styled-components';
import tw from 'twin.macro';
import { RecommandCard } from '../components/RecommandCard';
import { useAppSelector } from '~/app/hooks';
import { selectRecommand } from '../recommandSlice';

interface Recommand {
  title: string;
  lat: string;
  lng: string;
  id: number;
}

export const PickList = () => {
  const currentState = useAppSelector(selectRecommand);
  const pickList = currentState.pickList;
  if (pickList) {
    return (
      <>
        <OptionBox>
          <TopSection>
            <CityTitle>도시이름</CityTitle>
            <CityTitle>2박 3일</CityTitle>
            <Day>2023.04.01 - 2023.04.01</Day>
          </TopSection>
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
const Day = styled.div`
  ${tw`font-normal text-2xl text-slate-600 `}
`;
