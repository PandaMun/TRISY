import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';

type MarkerType = {
  title: string;
  lat: string;
  lng: string;
};

export const KakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.onload = async () => {
      const { kakao } = window;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(37.624562, 127.1512),
        level: 8,
      };
      const map = new kakao.maps.Map(container, options);
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      const bounds = new kakao.maps.LatLngBounds();
      await axios.get('http://localhost:3003/markers').then((res) => {
        res.data.forEach((el: MarkerType) => {
          const content = `<div class ="label" style =" border-radius: 10%; padding: 5px; background-color: rgba(38, 219, 225, .9);  color: white;"><span class="left"></span><span class="center">${el.title}</span><span class="right"></span></div>`;

          const position = new kakao.maps.LatLng(el.lat, el.lng);
          bounds.extend(position);
          const customOverlay = new kakao.maps.CustomOverlay({
            position: position,
            content: content,
          });
          customOverlay.setMap(map);
        });
      });
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      map.setBounds(bounds);
    };
  }, []);
  return (
    <MapDiv>
      <MapContainer ref={mapRef} />
    </MapDiv>
  );
};
const MapDiv = styled.section`
  min-width: 60vw;
`;
const MapContainer = styled.div`
  height: 80vh;
  width: 60vw;
`;
