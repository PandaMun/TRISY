import styled from 'styled-components';
import tw from 'twin.macro';
import { RecommandCard } from '../components/RecommandCard';
import { useAppSelector } from '~/app/hooks';
import { selectRecommand } from '../recommandSlice';

interface Recommand {
  title: string;
  lat: string;
  lng: string;
}

export const PickList = () => {
  const currentState = useAppSelector(selectRecommand);
  const pickList = currentState.pickList;
  if (pickList) {
    return (
      <>
        <OptionBox>
          <OptionTitle>선택 목록</OptionTitle>
          {pickList.length > 0 && (
            <div>
              {pickList.map((pick: Recommand) => (
                <RecommandCard key={pick.lat} title={pick.title} src={pick.lat} />
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
  ${tw`flex grow flex-col justify-center items-center`}
  min-width: 10vw
`;
const OptionTitle = styled.span`
  ${tw`text-xl font-bold`}
`;
