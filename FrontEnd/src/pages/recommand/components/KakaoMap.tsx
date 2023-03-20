import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const KakaoMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    window.onload = () => {
      const { kakao } = window;
      const container = mapRef.current;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 9,
      };
      const map = new kakao.maps.Map(container, options);
    };
  }, []);
  return <MapContainer ref={mapRef} />;
};

const MapContainer = styled.div`
  height: 80vh;
  width: 60vw;
`;
