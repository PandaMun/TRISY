import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { pickPlace, selectRecommand, setPlace } from '../recommandSlice';
import { SurveyResult, pick } from '~/pages/Survey/SurveySlice';
import { useParams } from 'react-router-dom';
import { ConvertDate } from '../components/ConvertDate';
import { ModalState } from '~/pages/home/components/MidSection/ModalSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PickedCard } from '../components/PickedCard';
import { schedule, setLocation, setModalOpen, setspotInfoList } from './ScheduleSlice';
import { createScheduleApi, surveyCheckApi } from '~/api/boardApi';

import tw from 'twin.macro';
interface spot {
  date?: string;
  id?: number;
  image_url?: string;
  lat?: number;
  lng?: number;
  main_address?: string;
  spot_info?: string;
  spot_name?: string;
  thumbnail_url?: string;
}
export const PickList = () => {
  const dispatch = useAppDispatch();
  const [spotInfo, setSpotInfo] = useState<spot[]>([]);
  useEffect(() => {
    const surveyCheck = async () => {
      const res = await surveyCheckApi();
      return res;
    };
    surveyCheck().then((re) => {
      if (surveyResult.surveyPick.length < 10) {
        dispatch(pick(re.toString()));
      }
    });
    axios
      .post('http://j8c202.p.ssafy.io:8000/fast/recommendation', {
        user_test: surveyResult.surveyPick,
        si_name: location,
      })
      .then((res: any) => {
        const result: spot[] = [...res.data.result];
        setSpotInfo(result);
        dispatch(setPlace(res.data.result));
      });
  }, []);
  const currentState = useAppSelector(selectRecommand);
  const surveyResult = useAppSelector(SurveyResult);
  const ModalSlice = useAppSelector(ModalState);
  const ScheduleSlice = useAppSelector(schedule);

  const { location } = useParams<{ location: string }>();
  const pickList = currentState.pickList;

  const dateList = new Array(ModalSlice.range).fill([]).map(() => []);
  dateList.push([]);
  const setSchedule = async () => {
    dispatch(setLocation({ location: location }));
    spotInfo.map((v: any) => {
      if (v.date !== '0') {
        dispatch(
          setspotInfoList({ spotId: v.id, spotName: v.spot_name, planDate: parseInt(v.date) }),
        );
      }
    });
    dispatch(setModalOpen());
    await createScheduleApi({
      tourName: ScheduleSlice.tourName,
      location: ScheduleSlice.location,
      startDate: ScheduleSlice.startDate,
      endDate: ScheduleSlice.endDate,
      spotInfoList: ScheduleSlice.spotInfoList,
    });
  };
  //style
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    userSelect: 'none',
    padding: 10,
    // withd: `500px`,
    margin: `5 0`,
    border: '1px solid #ccc',
    width: '200px',
    background: isDragging ? 'lightgreen' : '',
    ...draggableStyle,
  });
  //dragEnd
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    let spots: any = [...spotInfo];
    let index;
    if (source.droppableId !== destination.droppableId) {
      index = spots.findIndex((v: any) => v.id === parseInt(result.draggableId));
      const newSpots = spots.map((o: any) => ({ ...o }));
      const findObj: any = newSpots[index];
      console.log(findObj);
      findObj.date = destination.droppableId;
      newSpots.splice(index, 1);
      spots = [...newSpots, findObj];
      setSpotInfo(spots);
      dispatch(pickPlace({ id: findObj.id }));
    } else {
      if (source.index !== destination.index) {
        const selectSpot = spots[result.source.index];
        spots.splice(result.source.index, 1);
        spots.splice(destination.index, 0, selectSpot);
        setSpotInfo(spots);
      }
    }
  };
  //DRAGGABLE
  const spotInfoDatas: any = (dropId: string) => {
    return spotInfo.map((spot: any, idx: any) => {
      if (spot.date === dropId)
        return (
          <Draggable draggableId={spot.id.toString()} index={idx} key={spot.id}>
            {(provided, snapshot) => {
              return (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  className=''
                >
                  <StyledDragCard>
                    <PickedCard
                      key={spot.lat}
                      title={spot.spot_name}
                      src={spot.image_url ? spot.image_url : '/No_Image.jpg'}
                      id={spot.id}
                    />
                  </StyledDragCard>
                </div>
              );
            }}
          </Draggable>
        );
    });
  };

  if (pickList) {
    return (
      <>
        <OptionBox>
          <div className='font-nexon text-center font-bold'>
            <div className='text-3xl'>{location}</div>
            <div>
              {ConvertDate(ModalSlice.startDate)} ~ {ConvertDate(ModalSlice.endDate)}
            </div>
          </div>
          <div className=''>
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              {/* <OptionTitle>추천 목록</OptionTitle> */}
              <div className={`grid grid-cols-1 w-full h-full`}>
                {dateList.map((_v, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`map${idx} ${
                        idx > 1 ? 'hidden' : 'col-span-1'
                      } flex border-4 m-3 p-3 h-[300px] w-full overflow-x-scroll`}
                    >
                      <Droppable droppableId={idx.toString()} key={idx.toString()}>
                        {(provided) => (
                          <div
                            className={`ColoredDiv cardlists_${idx} flex relative`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            <div className={`${idx < 2 ? '' : 'hidden'} w-[90px]`}>
                              {idx === 0 ? '추천리스트' : '여행지'}
                            </div>
                            {/* {idx && <StyledText>{`${idx}일차`}</StyledText>} */}
                            {spotInfoDatas(idx.toString())}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext>
            <ModalButtons onClick={setSchedule}>일정생성</ModalButtons>
          </div>
        </OptionBox>
      </>
    );
  }
  return <h1>추천 없음</h1>;
};
const StyledDragCard = styled.div`
  ${tw`w-full h-full`}
  Section {
    ${tw`w-full h-full flex flex-col`}
  }
  img {
    ${tw`w-full h-3/4`}
  }
`;

const OptionBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 85vh;
`;
// const TopSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 300px;
// `;
// const MidSection = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   flex-grow: 1;
// `;
// const OptionTitle = styled.div`
//   font-size: 1.5rem;
//   font-weight: bold;
// `;

// const CityTitle = styled.div`
//   font-weight: bold;
//   font-size: 3rem;
// `;
// const Datediv = styled.div`
//   font-weight: medium;
//   font-size: 1.5rem;
//   margin-bottom: 2px;
//   margin-top: 2px;
// `;

const ModalButtons = styled.div`
  cursor: pointer;
  color: #1a202c;
  background: linear-gradient(to right, #90cdf4, #48bfe3);
  background-color: #90cdf4;
  background-image: linear-gradient(to right, #90cdf4, #48bfe3);
  transition: background-color 0.2s ease-out, background-image 0.2s ease-out;
  border-radius: 9999px;
  font-weight: medium;
  font-size: 0.875rem;
  padding: 0.625rem 1.25rem;
  text-align: center;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
  position: absolute;
  right: 1rem;
  bottom: 1rem;

  &:hover {
    background-color: #48bfe3;
    background-image: linear-gradient(to left, #90cdf4, #48bfe3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #90cdf4, 0 0 0 4px #48bfe3;
  }

  &.dark:focus {
    box-shadow: 0 0 0 2px #4fd1c5, 0 0 0 4px #38b2ac;
  }
`;
// const ColoredDiv = styled.div`
//   ${tw`rounded-lg border-4 border-black relative`}
//   width: 100%;
//   height: 200px;
//   overflow: auto;
//   margin: 10px;
//   flex: 1 0 calc(50% - 5px);
// `;

// const StyledText = styled.span`
//   ${tw`absolute top-12 left-2 bg-white px-2 border-4 border-black rounded-lg -translate-y-full`}
// `;

{
  /* <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <OptionTitle>선택 목록</OptionTitle>
              <div className={`grid grid-cols-${dateList.length - 1} w-[100%]`}>
                {dateList.map((_v, idx) => {
                  return (
                    <div
                      key={idx}
                      className={`map${idx} ${idx !== 0 ? 'auto-cols mx-4' : 'col-span-full'}`}
                    >
                      <Droppable droppableId={idx.toString()} key={idx.toString()}>
                        {(provided) => (
                          <ColoredDiv
                            className={`cardlists_${idx}`}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {idx && <StyledText>{`${idx}일차`}</StyledText>}
                            {spotInfoDatas(idx.toString())}
                            {provided.placeholder}
                          </ColoredDiv>
                        )}
                      </Droppable>
                    </div>
                  );
                })}
              </div>
            </DragDropContext> */
}
