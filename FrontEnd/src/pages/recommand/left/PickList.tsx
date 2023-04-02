import styled from 'styled-components';
import tw from 'twin.macro';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { RecommandCard } from '../components/RecommandCard';
import { useAppSelector } from '~/app/hooks';
import { selectRecommand } from '../recommandSlice';
import { useParams } from 'react-router-dom';
import { ConvertDate } from '../components/ConvertDate';
import { ModalState } from '~/pages/home/components/MidSection/ModalSlice';
import { PickedCard } from '../components/PickedCard';
interface Recommand {
  title: string;
  lat: string;
  lng: string;
  id: number;
}

export const PickList = () => {
  const currentState = useAppSelector(selectRecommand);
  const ModalSlice = useAppSelector(ModalState);
  const { id } = useParams<{ id: string }>();
  const { location } = useParams<{ location: string }>();
  const pickList = currentState.pickList;
  if (pickList) {
    return (
      <>
        <OptionBox>
          <TopSection>
            <CityTitle>{location}</CityTitle>
            <CityTitle>
              {ModalSlice.range - 1}박{ModalSlice.range}일
            </CityTitle>
            <Datediv>
              {ConvertDate(ModalSlice.startDate)} ~ {ConvertDate(ModalSlice.endDate)}
            </Datediv>
          </TopSection>
          <MidSection>
            <OptionTitle>선택 목록</OptionTitle>
            {pickList.length > 0 && (
              <div>
                {pickList.map((pick: Recommand) => (
                  <PickedCard key={pick.lat} title={pick.title} src={pick.lat} id={pick.id} />
                ))}
              </div>
            )}
          </MidSection>
          <ModalButtons>일정 생성</ModalButtons>
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
const Datediv = styled.div`
  ${tw`font-medium text-xl mb-2 mt-2`}
`;

const ModalButtons = styled.div`
  ${tw`hover:cursor-pointer text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-4 mb-2 absolute right-3 bottom-3`}
`;
