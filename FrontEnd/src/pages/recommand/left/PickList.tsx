import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch, useAppSelector } from '~/app/hooks';
import { selectRecommand, setPlace } from '../recommandSlice';
import { useParams } from 'react-router-dom';
import { ConvertDate } from '../components/ConvertDate';
import { ModalState } from '~/pages/home/components/MidSection/ModalSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PickedCard } from '../components/PickedCard';

export const PickList = () => {
  const dispatch = useAppDispatch();
  const [spotInfo, setSpotInfo] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3003/markers').then((res) => {
      dispatch(setPlace({ place: res.data }));
    });
    axios.get('http://localhost:3003/spots').then((res: any) => {
      setSpotInfo(res.data);
    });
  }, []);
  const currentState = useAppSelector(selectRecommand);
  const ModalSlice = useAppSelector(ModalState);

  const { location } = useParams<{ location: string }>();
  const pickList = currentState.pickList;

  const dateList = new Array(ModalSlice.range).fill([]).map(() => []);

  //dragEnd
  const onDragEnd = (result: any) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const { source, destination } = result;
    let spots: any = [...spotInfo];
    let index;
    if (source.droppableId !== destination.droppableId) {
      index = spots.findIndex((v: any) => v.id === parseInt(result.draggableId));
      const findObj: any = spots[index];
      findObj.date = destination.droppableId;
      spots.splice(index, 1);
      spots = [...spots, findObj];
      setSpotInfo(spots);
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
            {(provided) => {
              return (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <div>
                    <PickedCard key={spot.lat} title={spot.spot_name} src={spot.lat} id={spot.id} />
                  </div>
                  {/* <EditorComponent isDragging={snapshot.isDragging} /> */}
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
            <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
              <OptionTitle>선택 목록</OptionTitle>
              {dateList.map((_v, idx) => {
                return (
                  <Droppable droppableId={idx.toString()} key={idx.toString()}>
                    {(provided) => (
                      <ColoredDiv
                        className='cardlists'
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {spotInfoDatas(idx.toString())}
                        {provided.placeholder}
                      </ColoredDiv>
                    )}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </MidSection>
          <ModalButtons>일정 생성</ModalButtons>
        </OptionBox>
      </>
    );
  }
  return <h1>추천 없음</h1>;
};

const OptionBox = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 80vh;
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
`;
const MidSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;
const OptionTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const CityTitle = styled.div`
  font-weight: bold;
  font-size: 3rem;
`;
const Datediv = styled.div`
  font-weight: medium;
  font-size: 1.5rem;
  margin-bottom: 2px;
  margin-top: 2px;
`;

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
const ColoredDiv = styled.div`
  width: 400px;
  height: 200px;
  margin: 100px;
  background-color: #f0f0f0;
`;
