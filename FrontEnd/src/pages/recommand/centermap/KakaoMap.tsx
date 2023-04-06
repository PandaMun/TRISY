import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { selectRecommand } from '../recommandSlice';
import { useAppSelector } from '~/app/hooks';
import { ModalState } from '~/pages/home/components/MidSection/ModalSlice';

type MarkerType = {
  spot_name: string;
  lat: string;
  lng: string;
};

export const KakaoMap = () => {
  const mapRef = useRef(null);

  const currentState = useAppSelector(selectRecommand);
  const currentLocation = useAppSelector(ModalState);
  const Lat = currentLocation.lat;
  const Long = currentLocation.long;
  const pickList = currentState.pickList;
  useEffect(() => {
    const { kakao } = window;
    const container = mapRef.current;
    const options = {
      center: new kakao.maps.LatLng(Lat, Long),
      level: 8,
    };
    const map = new kakao.maps.Map(container, options);
    // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
    const bounds = new kakao.maps.LatLngBounds();
    if (pickList.length) {
      pickList.forEach((el: MarkerType) => {
        const content = `<div class ="label" style =" border-radius: 10%; padding: 5px; background-color: rgba(38, 219, 225, .9);  color: white;"><span class="left"></span><span class="center">${el.spot_name}</span><span class="right"></span></div>`;
        console.log(el);
        const position = new kakao.maps.LatLng(el.lng, el.lat);
        bounds.extend(position);
        const customOverlay = new kakao.maps.CustomOverlay({
          position: position,
          content: content,
        });
        customOverlay.setMap(map);
        return Promise.resolve();
      });
      map.setBounds(bounds);
    }
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, [Lat, Long, pickList]);
  return (
    <MapDiv>
      <MapContainer ref={mapRef} />
    </MapDiv>
  );
};
const MapDiv = styled.section`
  min-width: 40vw;
  display: flex;
`;
const MapContainer = styled.div`
  height: 90vh;
  flex-grow: 1;
`;
