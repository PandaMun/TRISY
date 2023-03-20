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
        level: 9,
      };
      const map = new kakao.maps.Map(container, options);
      axios.get('http://localhost:3003/markers').then((res) => {
        res.data.forEach((el: MarkerType) => {
          new kakao.maps.Marker({
            //마커가 표시 될 지도
            map: map,
            //마커가 표시 될 위치
            position: new kakao.maps.LatLng(el.lat, el.lng),
            //마커에 hover시 나타날 title
            title: el.title,
          });
        });
      });
      const zoomControl = new kakao.maps.ZoomControl();
      map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    };
  }, []);
  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 80vh;
  width: 60vw;
`;
