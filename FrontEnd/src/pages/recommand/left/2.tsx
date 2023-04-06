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
                      src={spot.image_url}
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
          <div className=''>
            <div>{location}</div>
            <div>
              {ModalSlice.range - 1}박{ModalSlice.range}일
            </div>
            <div>
              {ConvertDate(ModalSlice.startDate)} ~ {ConvertDate(ModalSlice.endDate)}
            </div>
            <button type='button' className='p-3 border-2' onClick={setSchedule}>
              일정 생성
            </button>
            {surveyResult.surveyPick.length > 10 && (
              <button type='button' className='p-3 border-2' onClick={setSchedule}>
                간편 검색
              </button>
            )}
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